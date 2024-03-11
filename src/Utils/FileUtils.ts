import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Services/FirebaseService";

const FileUtils = {
    downloadFile: async function (filePath: string, fileName: string = "") {
        let downloadFileName = fileName;

        if (fileName === "") downloadFileName = filePath.replace(/^.*[\\\/]/, "");

        getDownloadURL(ref(storage, filePath)).then((url) => {
            console.log(url);
            window.open(
                `${url}`,
                "_blank" // <- This is what makes it open in a new window.
            );
            // const xhr = new XMLHttpRequest();
            // xhr.responseType = "blob";
            // xhr.onload = (event) => {
            //     const blob = xhr.response;
            //     let link = document.createElement("a");
            //     link.href = window.URL.createObjectURL(blob);
            //     link.download = downloadFileName;
            //     document.body.appendChild(link);
            //     link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
            //     link.remove();
            //     window.URL.revokeObjectURL(link.href);
            // };
            // xhr.open("GET", url);
            // xhr.send();
        });
    },
};

export default FileUtils;
