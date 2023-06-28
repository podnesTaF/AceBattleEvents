"use client";

import { useGetSmallImagesQuery } from "@/services/imageService";
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
  handleClose: () => void;
  name: string;
  setIntroPreview: Function;
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
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { data: images, isLoading } = useGetSmallImagesQuery();
  const { register, formState, setValue, getValues } = useFormContext();
  const [picked, setPicked] = React.useState<any>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const onPick = (image: string) => {
    setValue(name, image);
    setPicked(image);
  };

  const getUploadedImage = async (
    image: string,
    previewUrl: string,
    imageName: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post(
        "http://localhost:4000/api/v1/images",
        formData
      );

      if ((res.status = 201)) {
        setValue(name, res.data.imagePath);
        setPicked(res.data.imagePath);
        setIntroPreview({ url: previewUrl, name: imageName });
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = () => {
    setIntroPreview({
      url: getValues(name),
      name: getValues(name).split("/")[3],
    });
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
            images?.imagePaths.map((image, index) => (
              <div
                key={index}
                className={`relative w-24 h-24 cursor-pointer hover:opacity-80 ${
                  picked === image && "border-2 border-blue-500"
                }`}
                onClick={onPick.bind(null, image)}
              >
                <Image src={image} alt="image" width={200} height={200} />
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
        <Button
          disabled={!!formState.errors[name]?.message}
          onClick={onAdd}
          type="button"
          size="large"
        >
          Add image
        </Button>
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
