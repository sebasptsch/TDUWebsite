import YoutubeVideo from "./YoutubeVideo";
import GDriveVideo from "./GDriveVideo";
import Image from "next/image";
type Components = Record<string, any>
const components = {
    YoutubeVideo,
    GDriveVideo,
    Image
} satisfies Components

export default components;