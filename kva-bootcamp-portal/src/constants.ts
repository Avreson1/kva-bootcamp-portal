export interface Participant {
  id: number;
  camp_no: string;
  full_name: string;
  phone_number: string;
  mothers_name?: string | null;
  email_address: string;
  church_attended: string;
  platoon_id: number;
  discipleship_id: number;
  created_at?: string;
}

export const PLATOONS: Record<number, { name: string; color: string }> = {
  1: { name: "Gideon’s Vanguard", color: "#DC2626" },
  2: { name: "Nehemiah’s Builders", color: "#475569" },
  3: { name: "Deborah’s Council", color: "#7C3AED" },
  4: { name: "Daniel’s Conviction", color: "#059669" },
  5: { name: "Joshua’s Frontier", color: "#EA580C" },
  6: { name: "Esther’s Intercessors", color: "#DB2777" },
  7: { name: "Elijah’s Fire", color: "#EAB308" },
  8: { name: "Timothy’s Legacy", color: "#0284C7" },
};

export const DISCIPLESHIP_GROUPS: Record<number, string> = {
  1: "Enoch (The Walk of Intimacy)",
  2: "Noah (The Ark Builder)",
  3: "Abraham (The Father of Nations)",
  4: "Joseph (The Strategic Preserver)",
  5: "Moses (The Deliverer)",
  6: "Ruth (The Loyal Pioneer)",
  7: "Samuel (The Prophetic Voice)",
  8: "David (The Worshipping Warrior)",
  9: "Solomon (The Kingdom Builder)",
  10: "Hezekiah (The Reformer)",
  11: "Josiah (The Truth Restorer)",
  12: "John the Baptist (The Way Preparer)",
  13: "Peter (The Bold Key-Bearer)",
  14: "John (The Beloved Revelator)",
  15: "Stephen (The Uncompromised Witness)",
  16: "Philip (The Frontier Evangelist)",
  17: "Luke (The Faithful Historian & Physician)",
  18: "Timothy (The Generational Legacy Carrier)",
  19: "Nehemiah (The Visionary Restorer)",
  20: "Gideon (The Mighty Warrior of Valor)"
};