"use client";

import { IMedia } from "@/models/IMedia";
import { useGetImagesQuery } from "@/services/imageService";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import ImagePicker from "./ImagePicker";

interface Props {
  isOpen: boolean;
  handleClose: (image?: any) => void;
  name: string;
  setIntroPreview: Function;
  instantUpload?: boolean;
  storageUnavailable?: boolean;
}

const tabs = [
  {
    label: "Images",
  },
  {
    label: "Upload New",
  },
];

const AddImageDialog: React.FC<Props> = ({
  isOpen,
  handleClose,
  name,
  setIntroPreview,
  instantUpload,
  storageUnavailable,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { data: images, isLoading } = useGetImagesQuery();
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
      const { data } = await axios.post<IMedia, any>(
        "https://abe-server.up.railway.app/api/v1/images",
        formData
      );

      if (data) {
        setValue(name, data);
        setPicked(data.mediaUrl);
        setIntroPreview({ url: previewUrl, name: data.title });
        if (instantUpload) {
          handleClose(data);
        } else {
          handleClose();
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
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Divider />
      <TabPanel value={activeTab} index={0}>
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
                <Image
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
      <TabPanel value={activeTab} index={1}>
        {!picked && (
          <div className="flex flex-wrap gap-4">
            <ImagePicker name={name} customSubmit={getUploadedImage} />
          </div>
        )}
      </TabPanel>
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
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
