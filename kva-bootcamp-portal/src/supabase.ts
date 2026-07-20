import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import { PLATOONS, DISCIPLESHIP_GROUPS, Participant } from '../constants';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const registerParticipant = async (formData: {
  fullName: string;
  phoneNumber: string;
  mothersName: string;
  emailAddress: string;
  churchAttended: string;
}): Promise<Participant> => {
  const { count, error: countError } = await supabase
    .from('participants')
    .select('*', { count: 'exact', head: true });

  if (countError) throw new Error(countError.message);
  const currentTotal = count || 0;

  const platoonId = (currentTotal % 8) + 1;
  const discipleshipId = (currentTotal % 20) + 1;
  const campNo = `KVA/BC26/${String(currentTotal + 1).padStart(3, '0')}`;

  const { data, error } = await supabase
    .from('participants')
    .insert([
      {
        camp_no: campNo,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        mothers_name: formData.mothersName || null,
        email_address: formData.emailAddress,
        church_attended: formData.churchAttended,
        platoon_id: platoonId,
        discipleship_id: discipleshipId,
      },
    ])
    .select();

  if (error) throw error;
  return data[0] as Participant;
};

export const handleExcelExport = async () => {
  const { data: records, error } = await supabase
    .from('participants')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;

  const matrix = (records as Participant[]).map(p => ({
    "Camp No": p.camp_no,
    "Full Name": p.full_name,
    "Phone Number": p.phone_number,
    "Mother's Name (WOGIN)": p.mothers_name || "N/A",
    "Email Address": p.email_address,
    "Church Attended": p.church_attended,
    "Assigned Platoon": PLATOONS[p.platoon_id]?.name || `Platoon ${p.platoon_id}`,
    "Discipleship Group": DISCIPLESHIP_GROUPS[p.discipleship_id] || `Group ${p.discipleship_id}`
  }));

  const worksheet = XLSX.utils.json_to_sheet(matrix);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Camp_Participants");
  XLSX.writeFile(workbook, "KVA_Bootcamp_2026_Master_Roster.xlsx");
};