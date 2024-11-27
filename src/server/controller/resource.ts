import {Request, Response} from "express";
import {Cloudinary} from "../services";
import BadRequestError from "../helpers/errors";

export const resource = {
    upload: async (req: Request, res: Response) => {
        if (!req.file) {
            throw new BadRequestError({code: 400, message: "No file uploaded!", logging: true});
        }
        try {
            const {cloud_storage} = req.params;
            const configure = req.body;

            switch (cloud_storage) {
                case 'cloudinary': {
                    const {cloud_name, api_key, api_secret} = configure;

                    console.log(configure)

                    const service = new Cloudinary({
                        cloud_name,
                        api_key,
                        api_secret,
                    });

                    // Gọi phương thức ping
                    console.log(req.file)
                    const result = await service.upload(req.file.path);
                    res.status(200).json({
                        status: 'success',
                        message: 'Upload successfully',
                        data: result,
                        success: true,
                    });
                }
            }
        } catch (e: unknown) {
            handleError(res, e);
        }
    },
    // read: async (req, resp) => {
    //     const { bucketname, objectpath, filename } = req.params;
    //     // resp.redirect(`${constant.endpoint}/${cloudinary.config().cloud_name}/${bucketname}/${objectpath}/${filename}`);
    //     // Dont use redirect
    //     const options = {
    //         method: 'GET',
    //     };
    //     const ssl = true;
    //     const transport = ssl ? https : http;
    //     const request = transport.request(
    //         `${constant.endpoint}/${cloudinary.config().cloud_name}/${bucketname}/${objectpath}/${filename}`,
    //         options,
    //         (res) => {
    //             resp.set(res.headers);
    //             res.pipe(resp);
    //         },
    //     );
    //     request.on('error', (e) => {
    //         console.error(e);
    //     });
    //     request.end();
    // },
    // list: async (req, resp) => {
    //     const bucket = 'dino-gallery';
    //     const data = await storage.list(bucket);
    //     const response = [];
    //     for (v of data.resources) {
    //         response.push({
    //             asset_id: v.asset_id,
    //             demo_url: 'http://localhost:3000/api/' + v.public_id,
    //             format: v.format,
    //             resource_type: v.resource_type,
    //             bytes: v.bytes,
    //             created_at: v.created_at,
    //         });
    //     }
    //     resp.status(200).json({
    //         data: response,
    //         message: 'List file in gallery',
    //         success: true,
    //     });
    // },
    // delete: async (req, resp) => {
    //     const result = await storage.delete(req);
    //     resp.status(200).json({
    //         data: result,
    //         message: 'Delete file successfully',
    //         success: true,
    //     });
    // },
};

// async function listDirection() {
//     if (!fse.existsSync(localMetadata)) {
//         console.error("Not exits directory: ", localMetadata)
//         fse.writeJsonSync(localMetadata, [])
//     }
//     jsonString = await fse.readFile(localMetadata, "utf8")
//     listImage = JSON.parse(jsonString);
//     return listImage
// }

const handleError = (res: Response, e: unknown) => {
    if (e instanceof Error) {
        res.status(500).json({
            error: {code: e.name, message: e.message},
            success: false,
        });
    } else {
        res.status(500).json({
            error: {code: 'UNKNOWN', message: 'An unknown error occurred'},
            success: false,
        });
    }
};
