//  import { Leaf } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-6">
//       <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-8 flex-nowrap">
        
//         {/* Logo Section */}
//         <div className="flex items-center space-x-2 text-xl font-semibold">
//           <Leaf size={24} className="text-green-400" />
//           <span>EcoWarriors</span>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex space-x-6 flex-shrink-0">
//           <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
//           <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
//           <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
//         </div>

//         {/* Copyright Section */}
//         <div className="text-sm text-gray-400 flex-shrink-0">
//           © 2025 EcoWarriors. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-8">
        
        {/* Logo Section */}
        <div className="flex items-center text-lg font-semibold">
          <Leaf size={24} className="text-green-400 mr-2" />
          <span>EcoWarriors</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
        </div>

        {/* Copyright Section */}
        <div className="text-sm text-gray-500">
          © 2025 EcoWarriors. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
