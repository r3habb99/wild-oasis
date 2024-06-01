import { handleError } from "../utils/errorHandler";
import supabase from "./supabase";

// Get settings from the database
export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();
  handleError(error, 'Load settings');
  return data;
}

// Update settings in the database
// Expects a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  handleError(error, 'Update settings');
  return data;
}
