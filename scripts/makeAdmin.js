import { UserModel } from "../models/user.js";

const makeAdmin = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
    
        if (!user) {
            console.log("User not found.");
            return;
        }
    
        user.admin = true; // or user.role = 'admin' if using roles
        await user.save();
    
        console.log(`${user.name} is now an admin.`);
    } catch (error) {
        console.error("An error occurred:", error.message); 
    }
};

makeAdmin("officialtheodora20@gmail.com").catch(console.error);
makeAdmin("mawuseakosuamorttey@gmail.com").catch(console.error);
