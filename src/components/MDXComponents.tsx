import YoutubeVideo from "./YoutubeVideo";
import GDriveVideo from "./GDriveVideo";
import Image from "next/image";
import SponsorsComponent from "./Sponsors";
import ContactForm from "./ContactForm";
type Components = Record<string, any>
const MDXComponents = {
    YoutubeVideo,
    GDriveVideo,
    Image,
    Sponsors: SponsorsComponent,
    Contact: ContactForm,
} satisfies Components

export default MDXComponents;