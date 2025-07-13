import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Search, BarChart3 } from 'lucide-react'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1])
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1])

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-gradient-hero relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        style={{ scale }}
      >
        <motion.h2 
          className="text-5xl md:text-7xl font-bold mb-8 text-glow"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Join the
          <span className="block text-accent">Revolution</span>
        </motion.h2>
        
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your choices matter. Transform your shopping habits today 
          and become the eco-hero our planet needs.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="mb-16 flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/search">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow transition-smooth hover:scale-105 px-8 py-6 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Find Eco Alternatives
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button 
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-glow transition-smooth hover:scale-105 px-8 py-6 text-lg"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Email signup */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Card className="glass-effect max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Enter your email for updates"
                  className="flex-1 bg-background/50 border-primary/30 focus:border-primary"
                />
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow transition-smooth"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Join 50,000+ eco-conscious shoppers making a difference
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { name: "Walmart", partnership: "Official Partner" },
            { name: "Amazon", partnership: "Integration Ready" },
            { name: "Target", partnership: "Coming Soon" },
            { name: "Costco", partnership: "In Development" },
          ].map((partner, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">{partner.name}</div>
              <div className="text-sm text-muted-foreground">{partner.partnership}</div>
            </div>
          ))}
        </motion.div>

        {/* Final call to action */}
        <motion.div
          className="text-center"
          style={{ 
            filter: useTransform(glow, [0, 1], ["brightness(1)", "brightness(1.2)"])
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/search">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 text-lg shadow-glow transition-smooth"
              >
                Start Your Eco Journey Today
              </Button>
            </Link>
          </motion.div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Free to start • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}