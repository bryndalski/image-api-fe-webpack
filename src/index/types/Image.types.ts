/**
 * Represents an image.
 * @property {number} imageSize - The size of the image.
 * @property {string} userId - The UUID of the user who uploaded the image.
 * @property {string} imageExtension - The file extension of the image.
 * @property {string} imageUrl - The URL where the image can be accessed.
 * @property {string} id - The UUID of the image.
 * @property {string} imageName - The original name of the image file.
 * @property {boolean} isLoved - Whether the image is marked as loved.
 */
export type ImageTypes = {
    imageSize: number;
    userId: string;
    imageExtension: string;
    imageUrl: string;
    id: string;
    imageName: string;
    isLoved: boolean;
};