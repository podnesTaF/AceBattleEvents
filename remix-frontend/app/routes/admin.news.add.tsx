import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, IconButton } from "@mui/material";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import {
  FilterBage,
  FormButton,
  FormField,
  FormPartsLayout,
  FormSelect,
  ImageField,
} from "~/components";
import AdminHeader from "~/components/admin/AdminHeader";
import { IContent } from "~/lib/news/types/INews";
import { creatNewsSchema } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const { url } = request;
  const newsId = new URL(url).searchParams.get("newsId");

  let news;
  let defaultValues;
  if (newsId) {
    news = await Api().news.getNewsById(newsId);
    if (news) {
      defaultValues = {
        title: news.title,
        mainImage: news.mainImage || null,
        contents: news.contents,
        hashtags: news.hashtags.map((hashtag) => ({
          name: hashtag.name,
          id: hashtag.id,
        })),
      };
    }
  }

  return json({
    news: news || null,
    defaultValues: defaultValues || null,
  });
};

const AddNews = () => {
  const { defaultValues, news } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [imageContentPreviews, setImageContentPreviews] = useState<{
    [key: number]: { url: string; name: string };
  }>();
  const [contents, setContents] = useState<{
    [key: number]: { type: string };
  }>();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(creatNewsSchema),
    defaultValues: defaultValues || {},
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "contents",
  });

  const { append: appendHash, remove: removeHash } = useFieldArray({
    control: form.control,
    name: "hashtags",
  });

  const onSubmit = async (dto: any) => {
    if (!news) {
      const mappedContents = dto.contents.map((content: any) => {
        delete content.id;
        return content;
      });

      const mappedHashtags: string[] = dto.hashtags.map((hashtag: any) => {
        delete hashtag.id;
        return hashtag.name;
      });

      const news = await Api().news.createNews({
        title: dto.title,
        mainImage: dto.mainImage,
        contents: mappedContents,
        hashtags: mappedHashtags,
      });
      if (news) {
        navigate("/admin/news");
      } else {
        console.log("error");
      }
    } else {
      const newHashes = dto.hashtags.filter((hash: any) => hash.id > 100000);
      const mappedHashtags: { name: string; id: any }[] = newHashes.map(
        (hashtag: any) => ({
          id: null,
          name: hashtag.name,
        })
      );

      const contents: any[] = [];

      dto.contents.forEach((content: IContent) => {
        if (content.id > 100000) {
          contents.push({
            ...content,
            id: null,
          });
        } else {
          contents.push(content);
        }
      });

      const updatedNews = await Api().news.updateNews(news.id, {
        title: dto.title,
        mainImage: dto.mainImage,
        contents,
        hashtags: [...mappedHashtags, ...news.hashtags],
      });

      if (updatedNews) {
        navigate("/admin/news");
      } else {
        console.log("error");
      }
    }
  };

  useEffect(() => {
    if (defaultValues) {
      const oldCotentImages = defaultValues.contents.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: {
            url: curr.media?.mediaUrl,
            name: curr.media?.title,
          },
        }),
        {}
      );
      const oldContents = defaultValues.contents.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: {
            type: curr.type,
          },
        }),
        {}
      );

      setImageContentPreviews(oldCotentImages);
      setContents(oldContents);
    }
  }, []);

  const addContent = () => {
    const id = Date.now();

    append({
      type: "0",
      id,
    });
  };

  const removeContent = (index: number, contentId: number) => {
    remove(index);

    if (imageContentPreviews?.[contentId]) {
      setImageContentPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[index];
        return newPreviews;
      });
    }
  };

  const addHashtag = () => {
    appendHash({
      name: "",
      id: Date.now(),
    });
  };

  const removeHashtag = (index: number) => {
    removeHash(index);
  };

  return (
    <div className="w-full">
      <AdminHeader
        title={"News"}
        pageName="Admin Dashboard"
        description="Add Article"
      />
      <main className="max-w-4xl mx-4 md:mx-auto flex flex-col w-full gap-6 my-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormPartsLayout title="Article Details">
              <div className="w-full mb-4">
                <FormField
                  label="Title*"
                  name={"title"}
                  placeholder={"Enter article title here..."}
                />
              </div>
              <div className="w-full my-4">
                <div className="my-3">
                  <ImageField
                    defaulImage={
                      defaultValues?.mainImage
                        ? {
                            url: defaultValues.mainImage.mediaUrl,
                            name: defaultValues.mainImage.title,
                          }
                        : undefined
                    }
                    title="Upload Main Image"
                    name="mainImage"
                  />
                </div>
              </div>
              <div className="w-full mt-4">
                <div className="border-b-[1px] border-solid border-gray-300 py-1 flex flex-wrap items-center gap-2">
                  <h4 className="text-lg font-light uppercase mr-3 py-1">
                    Hashtags:
                  </h4>
                  {form.getValues("hashtags")?.map((hash, i) => (
                    <FilterBage
                      removeBade={removeHashtag}
                      index={i}
                      key={hash.id}
                      name={hash.name}
                      type={hash.id.toString()}
                    />
                  ))}
                  {!form.getValues("hashtags")?.length && (
                    <p className="text-lg text-gray-300">No Hashtags</p>
                  )}
                </div>
                <div className="flex w-full gap-2 items-center">
                  <div className="my-2 pr-4 border-r-[1px] border-black">
                    {form.getValues("hashtags")?.length > 0 && (
                      <FormField
                        name={`hashtags[${
                          form.getValues("hashtags")?.length - 1
                        }].name`}
                        label={"Enter hashtag"}
                        placeholder={"enter hashtag here..."}
                        type="text"
                      />
                    )}
                  </div>
                  <IconButton onClick={addHashtag}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>
              </div>
            </FormPartsLayout>
            <FormPartsLayout title={"Contents"}>
              {form.watch("contents")?.length < 1 && (
                <h4 className="text-center w-full font-semibold text-2xl">
                  You provided no content for article
                </h4>
              )}
              {form.watch("contents")?.map((content, index) => (
                <div
                  key={content.id}
                  className="w-full my-2 pb-3 border-b-[1px] border-black"
                >
                  <FormSelect
                    name={`contents[${index}].type`}
                    label={"Content Type"}
                    placeholder={"Choose content type"}
                    values={Object.entries({
                      text: "Text",
                      image: "Image",
                    })}
                    onChangeFilter={(value) =>
                      setContents((prev) => ({
                        ...prev,
                        [content.id]: {
                          type: value,
                        },
                      }))
                    }
                  />
                  {contents?.[content.id]?.type === "image" && (
                    <div className="mx-auto">
                      <ImageField
                        defaulImage={imageContentPreviews?.[content.id]}
                        title="upload content image"
                        name={`contents[${index}].media`}
                      />
                    </div>
                  )}
                  {contents?.[content.id]?.type === "text" && (
                    <FormField
                      name={`contents[${index}].text`}
                      label={"Enter text"}
                      placeholder={"enter text here..."}
                      type="text"
                      lines={8}
                    />
                  )}
                  <Button onClick={() => removeContent(index, content.id)}>
                    Remove
                  </Button>
                </div>
              ))}
            </FormPartsLayout>
            <div className="w-full my-3 flex items-center">
              <div className="flex-1 mx-4 h-[2px] bg-red-500" />
              <Button variant="outlined" onClick={addContent}>
                ADD CONTENT
              </Button>
            </div>
            <div className="w-full flex justify-start m-4">
              <FormButton
                title="Add Article"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                isLoading={form.formState.isSubmitting}
              />
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default AddNews;
