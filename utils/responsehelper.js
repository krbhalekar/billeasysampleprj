let response = (code, data) => {
    try {
        let responseArray = [
            { code: "BE000", status: "failed", message: "Something Went Wrong" },
            { code: "BE001", status: "success", message: "User Created Successfully" },
            { code: "BE002", status: "failed", message: "User Already Exists" },
            { code: "BE003", status: "success", message: "User Login Successfully" },
            { code: "BE004", status: "failed", message: "User Not Found" },
            { code: "BE005", status: "failed", message: "Access Denied" },
            { code: "BE006", status: "failed", message: "Invalid Token" },
            { code: "BE007", status: "failed", message: "File Upload Failed" },
            { code: "BE008", status: "success", message: "File Upload Successfully" },
            { code: "BE009", status: "success", message: "File Info Fetched Successfully" },
            { code: "BE010", status: "failed", message: "File Info Not Found" }
        ];
        let res = responseArray.find((r) => r.code === code);
        res.data = data;
        return res;
    } catch (error) {
        return { code: "BE000", status: "failed", message: "Something went wrong" };
    }
}

module.exports = { response };