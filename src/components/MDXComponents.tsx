import YoutubeVideo from "./YoutubeVideo";
import GDriveVideo from "./GDriveVideo";
import Image from "next/image";
import SponsorsComponent from "./Sponsors";
type Components = Record<string, any>
const MDXComponents = {
    YoutubeVideo,
    GDriveVideo,
    Image,
    Sponsors: SponsorsComponent,
} satisfies Components

export default MDXComponents;