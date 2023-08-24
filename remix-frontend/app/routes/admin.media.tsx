import { yupResolver } from "@hookform/resolvers/yup";
import { Collapse } from "@mui/material";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { FormButton, ImagePicker, SearchField } from "~/components";
import { useFilter } from "~/lib/hooks";
import { addImageSchema } from "~/lib/utils";

export const loader = async () => {
  const images = await Api().media.getAllMedia();

  return json({
    images,
  });
};

const MediaPage = () => {
  const { searchValue, setSearchValue, onChangeFilter } = useFilter();
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const { images } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  const onChangeInput = (newValue: string) => {
    setSearchValue(newValue);
    onChangeFilter("name", newValue);
  };

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(addImageSchema),
  });

  const onSubmit = async (dto: any) => {
    try {
      const formData = new FormData();
      formData.append("image", dto.image);
      const { data } = await Api().media.addMedia(formData);
      if (data) {
        form.reset();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <header className="w-full flex h-36 justify-center items-center relative bg-[url('/auth-intro.jpg')] bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="flex items-center z-10">
          <h2 className="text-white text-3xl lg:text-4xl pr-2 border-r-2 border-red-500 font-semibold uppercase">
            Media
          </h2>
          <h3 className="text-white text-2xl lg:text-3xl pl-2 font-semibold uppercase">
            Admin dashboard
          </h3>
        </div>
      </header>
      <main className="w-full">
        <div className="w-full flex flex-col gap-3 sm:flex-row justify-between items-center bg-[#1E1C1F] p-4 mb-4">
          <h2 className="text-white text-3xl font-semibold">All media</h2>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <SearchField onChangeInput={onChangeInput} value={searchValue} />
          </div>
        </div>
        <div className="mx-2 lg:mx-6 max-w-5xl">
          <button
            onClick={() => setOpenAdd((prev) => !prev)}
            className="bg-red-600 text-white outline-none border-none rounded-md hover:opacity-80 font-semibold uppercase px-4 py-2"
          >
            Add new
          </button>
          <Collapse in={openAdd}>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full my-4 h-32">
                  <label
                    htmlFor="image"
                    className="text-gray uppercase text-xl"
                  >
                    Upload Image
                  </label>
                  <ImagePicker name="image" />
                </div>
                <div className="w-32 mt-8 ml-auto">
                  <FormButton
                    title="upload"
                    disabled={false}
                    isSubmitting={form.formState.isSubmitting}
                    isLoading={form.formState.isSubmitting}
                  />
                </div>
              </form>
            </FormProvider>
          </Collapse>
        </div>
        <div className="max-w-6xl flex flex-wrap gap-4 mx-2 lg:mx-6 my-6">
          {images.length > 0 &&
            images.map((image: any, i: number) => (
              <div
                key={image.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              >
                <div className={`w-full h-48 bg-no-repeat bg-cover`}>
                  <img
                    src={image.smallUrl}
                    alt="small image"
                    width={200}
                    className="object-contain"
                    height={200}
                  />
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default MediaPage;
