import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase"
import notification from "./notification"

const uploadPhotoSyntax = (file, fileName) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `MedicineImages/${fileName}`)
        uploadBytes(storageRef, file).then(
            (snapshot) => {
                alert("Success uploading photo")

                getDownloadURL(storageRef).then((img_url) => {
                    resolve(img_url)
                }).catch((err) => {
                    reject(err)
                })
            }
        ).catch((err) => {
            alert(`${err}`)
            reject(err)
        })
    })
}

export default uploadPhotoSyntax
