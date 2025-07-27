import { useState } from "react";
import { ProfileDetails } from "../../features/admin/Profile/components/ProfileDetails";
import { useAdminProfile } from "../../features/admin/Profile/hooks/useAdminProfile";
import { Home, ShoppingBag, User, Package, Settings2 } from "lucide-react";

const AdminProfilePage = () => {
  const { data, loading } = useAdminProfile();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white font-sans">
      {/* Header */}
      <div className="bg-[#CDB5F9] rounded-b-[40px] pb-12 relative z-10">
        <nav className="flex items-center justify-between px-6 py-4">
          <div className="font-bold text-lg text-white">Logo</div>
          <ul className="hidden md:flex space-x-6 font-medium items-center text-white text-md">
            <li className="flex items-center gap-1 hover:underline cursor-pointer">
              <Home size={18} /> Home
            </li>
            <li className="flex items-center gap-1 hover:underline cursor-pointer">
              <Package size={18} /> Product
            </li>
            <li className="flex items-center gap-1 hover:underline cursor-pointer">
              <ShoppingBag size={18} /> Orders
            </li>
            <li className="flex items-center gap-1 underline font-bold cursor-pointer">
              <User size={18} /> Profile
            </li>
          </ul>
        </nav>

        {/* Mobile quote + image */}
        <div className="flex flex-col items-center text-center mt-6 px-4 md:hidden">
          <h1 className="text-xl font-semibold text-white mb-2">Profile</h1>
          <p className="text-white text-base font-medium leading-snug mb-3">
            "Seamless Control for <br />
            Smarter Wholesale <br />
            Management."
          </p>
          <img
            src="/shopping-girl.png"
            alt="Decor"
            className="w-36 h-auto object-contain"
          />
        </div>

        {/* Desktop quote */}
        <div className="hidden md:flex items-center justify-between px-10 mt-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
            <p className="text-white text-lg font-medium leading-snug">
              "Seamless Control for <br />
              Smarter Wholesale <br />
              Management."
            </p>
          </div>
          <img
            src="/shopping-girl.png"
            alt="Decor"
            className="w-44 h-auto object-contain"
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="relative bg-gradient-to-b from-[#151853] to-[#4564D6] py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 relative z-20">
          {/* Profile details */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <ProfileDetails data={data} loading={loading} />
          </div>

          {/* Action Buttons */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end relative mt-6 md:mt-0">
            <div className="flex gap-3 mb-4">
              <button className="bg-white text-[#4564D6] px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
                Edit profile
              </button>
              <button
                className="text-white hover:text-gray-200 transition-colors"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings2 size={20} />
              </button>
            </div>

            {showSettings && (
              <div className="bg-white p-6 rounded-xl shadow-xl w-72 absolute top-16 md:top-14 right-0 z-30">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                    Account Details
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                    Change Password
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-white text-sm mt-20 flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded-full" />
            <span>Biolite Wholesales and Retails</span>
          </div>
          <div className="text-xs opacity-80">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
