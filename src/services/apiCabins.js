import supabase from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not found");
  }
  return data;
}
export async function deleteCabin(id) {
  console.log(id);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could deleted");
  }
  console.log(data);
}
