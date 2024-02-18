export const readFile = async (file : File) : Promise<string>=> {
    let upload = await fileToBase64(file);
    return upload.split(',')[1]
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;
            resolve(base64String);
        };
        reader.onerror = () => {
            reject("Erro ao ler o arquivo");
        };
        reader.readAsDataURL(file);
    });
}
