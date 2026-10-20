// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// interface User {
//   name: string;
//   email: string;
//   phone: string;
// }

// const Settings = () => {

//   const navigate = useNavigate();

//   const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

//   const [user, setUser] = useState<User>({
//     name: savedUser.name || "",
//     email: savedUser.email || "",
//     phone: savedUser.phone || ""
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

//     const { name, value } = e.target;

//     setUser({
//       ...user,
//       [name]: value
//     });

//   };

//   const saveProfile = () => {

//     localStorage.setItem("user", JSON.stringify(user));

//     toast.success("Profile updated");

//   };

//   const logout = () => {

//     localStorage.removeItem("user");

//     toast.success("Logged out");

//     navigate("/login");

//   };

//   return (

//     <div className="px-4 py-5 pb-20">

//       <h1 className="text-2xl font-bold mb-6">
//         Settings
//       </h1>

//       <div className="space-y-4">

//         <input
//           name="name"
//           placeholder="Full Name"
//           value={user.name}
//           onChange={handleChange}
//           className="w-full border border-border rounded-lg p-3 text-sm"
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           value={user.email}
//           onChange={handleChange}
//           className="w-full border border-border rounded-lg p-3 text-sm"
//         />

//         <input
//           name="phone"
//           placeholder="Phone"
//           value={user.phone}
//           onChange={handleChange}
//           className="w-full border border-border rounded-lg p-3 text-sm"
//         />

//         <button
//           onClick={saveProfile}
//           className="w-full rounded-lg bg-brand-gradient py-3 text-sm font-bold text-primary-foreground"
//         >
//           Save Changes
//         </button>

//         <button
//           onClick={logout}
//           className="w-full rounded-lg border border-red-500 py-3 text-sm font-semibold text-red-500"
//         >
//           Logout
//         </button>

//       </div>

//     </div>

//   );

// };

// export default Settings;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  phone: string;
}

const Settings = () => {

  const navigate = useNavigate();

  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [user, setUser] = useState<User>({
    name: savedUser.name || "",
    email: savedUser.email || "",
    phone: savedUser.phone || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Profile updated");
  };

  const logout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="px-4 py-5 pb-20">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          className="w-full border border-border rounded-lg p-3 text-sm"
        />
        <input
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full border border-border rounded-lg p-3 text-sm"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full border border-border rounded-lg p-3 text-sm"
        />
        <button
          onClick={saveProfile}
          className="w-full rounded-lg bg-brand-gradient py-3 text-sm font-bold text-primary-foreground"
        >
          Save Changes
        </button>
        <button
          onClick={logout}
          className="w-full rounded-lg border border-red-500 py-3 text-sm font-semibold text-red-500"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Settings;