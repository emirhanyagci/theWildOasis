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
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could deleted");
  }
}
export async function createCabin(newCabin) {
  console.log(newCabin);
  const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imagePath });
  if (error) {
    console.error(error);
    throw new Error("Cabins could deleted");
  }
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // remove cabin if image could not upload
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabins image could not be uploaded and cabin was not created"
    );
  }
}
