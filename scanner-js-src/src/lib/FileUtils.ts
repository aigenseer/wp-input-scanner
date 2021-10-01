/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */
export default class FileUtils {

    public static selectFile(): Promise<File|null>
    {
        return new Promise((resolve: Function, reject: Function) => {
            let readFile = function(e: any) {
                let file = e.target.files[0];
                if (!file) {
                    resolve(null);
                    return;
                }
                resolve(file);
            }
            let fileInput = document.createElement("input")
            fileInput.type='file'
            fileInput.style.display='none'
            fileInput.onchange=readFile
            document.body.appendChild(fileInput)
            fileInput.click();
        });
    }

    public static readFileAsBase64(file: File): Promise<string>
    {
        return new Promise((resolve: Function, reject: Function) => {
            try {
                let reader = new FileReader();
                reader.onload = function(e: any) {
                    resolve(e.target.result)
                };
                reader.readAsDataURL(file);
            }catch (err){
                return Promise.reject(err);
            }
        });
    }

    public static readImageFromFile(file: File): Promise<HTMLImageElement>
    {
        return new Promise((resolve: Function, reject: Function) => {
            try {
                let reader = new FileReader();
                let img = new Image();
                img.onload = function() {
                    resolve(img);
                }
                reader.onload = function(e: any) {
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }catch (err){
                return Promise.reject(err);
            }
        });
    }



}