import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  setValue: (value: string) => void;
}
export default function WYSIWYG({ value, setValue }: Props) {
  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}></ReactQuill>
  );
}
