const aws = require("aws-sdk");

exports.upload = (req, res) => {
    if (req.method == "GET") {
        res.send("this is from a get request");
        return;
    }
    const data = req.body;

    const name = data.name;
    const type = data.type;
    const file = data.file;
    const bucketName = data.bucketName;
    const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");
    const location = "location";
    upload(spacesEndpoint, bucketName, name, file, type);

    res.send(location);
};


function upload(spacesEndpoint, bucketName, name, file, type) {

    const s3 = new aws.S3({
        endpoint: spacesEndpoint,
        accessKeyId: "VXY66YEUJDFVUHXCBT4U",
        secretAccessKey: "qUESRDN7jNITEqu7QLu/qfLzZwLKTQt0EcnGqsDQfC0",
    });
    return new Promise(function (resolve, reject) {
        s3.upload({
            Bucket: bucketName,
            Key: name,
            Body: file,
            ContentType: type,
            ACL: "public-read",
            ContentLanguage: "English",

        }, (err, data) => {
            if (err)
                resolve(err);
            else
                resolve(data.Location);
        });
    });
}
