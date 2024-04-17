"use client";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Api } from "~/api/axiosInstance";
import { IMedia } from "~/lib/types";
import { ImagePicker } from "..";

interface Props {
  isOpen: boolean;
  token?: string;
  handleClose: (image?: any) => void;
  name: string;
  setIntroPreview: Function;
  instantUpload?: boolean;
  tabs: TabNames[];
}

export enum TabNames {
  images = "Images",
  upload = "Upload New",
}

const AddImageDialog: React.FC<Props> = ({
  isOpen,
  handleClose,
  name,
  token,
  setIntroPreview,
  instantUpload,
  tabs,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [images, setImages] = React.useState<IMedia[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, formState, setValue, getValues } = useFormContext();
  const [picked, setPicked] = React.useState<any>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const onPick = (image: IMedia) => {
    setValue(name, image.mediaUrl === picked ? "" : image);
    setPicked(picked === image.mediaUrl ? null : image.mediaUrl);
  };

  const getUploadedImage = async (image: string, previewUrl: string) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const data = await Api(token).media.addMedia(formData);
      if (data) {
        setValue(name, data);
        setPicked(data.mediaUrl);
        setIntroPreview({ url: previewUrl, name: data.title });
        if (data) {
          handleClose(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = () => {
    setIntroPreview({
      url: getValues(name).mediaUrl,
      name: getValues(name).title,
    });
    if (instantUpload) {
      handleClose(getValues(name));
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const media = await Api(token).media.getAllMedia();
      setImages(media);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Dialog maxWidth={"lg"} open={isOpen} onClose={handleClose}>
      <DialogTitle>Choose {name}</DialogTitle>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
      </Box>
      <Divider />
      {tabs.includes(TabNames.images) && (
        <TabPanel value={activeTab} index={tabs.indexOf(TabNames.images)}>
          <div className="flex flex-wrap gap-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              images?.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 cursor-pointer hover:opacity-80 ${
                    picked === image.mediaUrl && "border-2 border-blue-500"
                  }`}
                  onClick={onPick.bind(null, image)}
                >
                  <img
                    src={image.smallUrl}
                    alt="image"
                    width={200}
                    height={200}
                  />
                </div>
              ))
            )}
          </div>
        </TabPanel>
      )}
      {tabs.includes(TabNames.upload) && (
        <TabPanel value={activeTab} index={tabs.indexOf(TabNames.upload)}>
          {!picked && (
            <div className="flex flex-wrap gap-4">
              <ImagePicker name={name} customSubmit={getUploadedImage} />
            </div>
          )}
        </TabPanel>
      )}
      <input type="text" className="hidden" {...register(name)} />
      <Divider />
      <div className="flex justify-end items-center gap-4 p-2">
        <Button type="button" onClick={handleClose} size="large">
          Cancel
        </Button>
        <button
          disabled={!picked}
          onClick={onAdd}
          type={"button"}
          className="px-4 py-2 bg-red-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add image
        </button>
      </div>
    </Dialog>
  );
};

export default AddImageDialog;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
