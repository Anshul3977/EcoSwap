// import { motion, useScroll, useTransform } from 'framer-motion'
// import { useRef } from 'react'
// import { Card, CardContent } from '@/components/ui/card'

// export function HowItWorksSection() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"]
//   })

//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

//   const steps = [
//     {
//       number: "01",
//       title: "Shop Normally",
//       description: "Browse and shop for products just like you always do",
//       icon: "🛒"
//     },
//     {
//       number: "02", 
//       title: "Get Recommendations",
//       description: "Our AI suggests eco-friendly alternatives for your items",
//       icon: "🌱"
//     },
//     {
//       number: "03",
//       title: "Make the Swap",
//       description: "Choose better alternatives with one simple click",
//       icon: "🔄"
//     },
//     {
//       number: "04",
//       title: "Track Your Impact",
//       description: "See how your choices are making a difference",
//       icon: "📊"
//     }
//   ]

//   return (
//     <section 
//       ref={sectionRef}
//       className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-muted/20"
//     >
//       <motion.div 
//         className="max-w-6xl mx-auto"
//         style={{ opacity }}
//       >
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <h2 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
//             How It
//             <span className="block text-primary text-glow">Works</span>
//           </h2>
          
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Making sustainable choices has never been easier. 
//             Our platform seamlessly integrates into your shopping experience.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
//             >
//               <Card className="glass-effect h-full hover:shadow-glow transition-smooth hover:scale-105">
//                 <CardContent className="p-8 text-center">
//                   <div className="text-6xl mb-6">{step.icon}</div>
//                   <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
//                   <h3 className="text-xl font-semibold mb-4 text-foreground">{step.title}</h3>
//                   <p className="text-muted-foreground">{step.description}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Connecting lines */}
//         <div className="hidden lg:block absolute inset-0 pointer-events-none">
//           <svg className="w-full h-full" viewBox="0 0 1000 400">
//             <motion.path
//               d="M250,200 Q400,150 500,200 T750,200"
//               stroke="hsl(var(--primary))"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="10,5"
//               initial={{ pathLength: 0, opacity: 0 }}
//               whileInView={{ pathLength: 1, opacity: 0.3 }}
//               viewport={{ once: true }}
//               transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
//             />
//           </svg>
//         </div>
//       </motion.div>
//     </section>
//   )
// }


import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const steps = [
    {
      number: "01",
      title: "Shop Normally",
      description: "Browse and shop for products just like you always do",
      icon: "🛒"
    },
    {
      number: "02",
      title: "Get Recommendations",
      description: "Discover eco-friendly alternatives for your items",
      icon: "🌱"
    },

    {
      number: "03",
      title: "Make the Swap",
      description: "Choose better alternatives with one simple click",
      icon: "🔄"
    },
    {
      number: "04",
      title: "Track Your Impact",
      description: "See how your choices are making a difference",
      icon: "📊"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-muted/20"
    >
      <motion.div 
        className="max-w-6xl mx-auto"
        style={{ opacity }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 relative">
            <span className="text-foreground drop-shadow-lg">How It</span>
            <span className="block text-green-400 font-extrabold text-shadow-glow bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl">
              Works
            </span>
          </h2>
          
          {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Making sustainable choices has never been easier. 
            Our platform seamlessly integrates into your shopping experience.
          </p> */}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <Card className="glass-effect h-full hover:shadow-glow transition-smooth hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6">{step.icon}</div>
                  <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Connecting lines */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 400">
            <motion.path
              d="M250,200 Q400,150 500,200 T750,200"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10,5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}