// import { motion } from 'framer-motion'
// import { Button } from '@/components/ui/button'
// import { Leaf } from 'lucide-react'

// export function Navigation() {
//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' })
//     }
//   }

//   return (
//     <motion.nav
//       className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <motion.div 
//           className="flex items-center space-x-2"
//           whileHover={{ scale: 1.05 }}
//         >
//           <Leaf className="w-8 h-8 text-primary animate-float" />
//           <span className="text-2xl font-bold text-foreground">EcoSwap</span>
//         </motion.div>

//         {/* Navigation Links */}
//         <div className="hidden md:flex items-center space-x-8">
//           {[
//             { label: 'Problem', id: 'problem' },
//             { label: 'Solution', id: 'solution' },
//             { label: 'How It Works', id: 'how-it-works' },
//             { label: 'Impact', id: 'impact' },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => scrollToSection(item.id)}
//               className="text-muted-foreground hover:text-foreground transition-smooth"
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <Button 
//           className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow transition-smooth"
//           onClick={() => scrollToSection('cta')}
//         >
//           Get Started
//         </Button>
//       </div>
//     </motion.nav>
//   )
// }



/*/ new */
// import { motion } from 'framer-motion'
// import { Button } from '@/components/ui/button'
// import { Leaf } from 'lucide-react'

// export function Navigation() {
//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' })
//     }
//   }

//   return (
//     <motion.nav
//       className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50"
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <motion.div 
//           className="flex items-center space-x-2 cursor-pointer"
//           whileHover={{ scale: 1.05 }}
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         >
//           <Leaf className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
//           <span className="text-2xl font-bold text-gray-900 dark:text-white">EcoSwap</span>
//         </motion.div>

//         {/* Navigation Links */}
//         <div className="hidden md:flex items-center space-x-8">
//           {[
//             { label: 'Problem', id: 'problem' },
//             { label: 'Solution', id: 'solution' },
//             { label: 'How It Works', id: 'how-it-works' },
//           ].map((item) => (
//             <motion.button
//               key={item.id}
//               onClick={() => scrollToSection(item.id)}
//               className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors duration-200 relative group"
//               whileHover={{ y: -1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {item.label}
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 group-hover:w-full transition-all duration-300" />
//             </motion.button>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <Button 
//           className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 font-semibold"
//           onClick={() => scrollToSection('cta')}
//         >
//           Get Started
//         </Button>
//       </div>
//     </motion.nav>
//   )
// }

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Leaf, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Navigation() {
  const navigate = useNavigate()
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Leaf className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">EcoSwap</span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { label: 'Problem', id: 'problem' },
            { label: 'Solution', id: 'solution' },
            { label: 'How It Works', id: 'how-it-works' },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors duration-200 relative group"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </div>

        {/* Buttons Container */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Button
  variant="outline"
  className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white border-teal-600 transition-all duration-300"
  onClick={() => navigate('/walmart-cart')}
>
  <ShoppingCart className="w-5 h-5" />
  <span className="hidden sm:inline">Cart Demo</span>
</Button>
          {/* CTA Button */}
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 font-semibold"
            onClick={() => scrollToSection('cta')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}