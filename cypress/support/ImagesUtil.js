const CryptoJS = require("crypto-js");

export default class ImagesUtil {
    static getImageHash(imageContent) {
        return CryptoJS.SHA256(CryptoJS.lib.WordArray.create(imageContent)).toString();
  }
}