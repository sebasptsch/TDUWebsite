import YoutubeVideo from "./YoutubeVideo";
import GDriveVideo from "./GDriveVideo";
import Image, { ImageProps } from "next/image";
import SponsorsComponent from "./Sponsors";
import ContactForm from "./ContactForm";
import { MDXRemoteProps } from "next-mdx-remote";

const MDXComponents = {
    YoutubeVideo,
    GDriveVideo,
    Image: ImageWrapper,
    Sponsors: SponsorsComponent,
    Contact: ContactForm,
} satisfies MDXRemoteProps["components"]

function ImageWrapper(props: ImageProps) {
    return <Image {...props} />
}

export default MDXComponents;