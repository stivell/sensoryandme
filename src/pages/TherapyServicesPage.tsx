import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain,
  Hand,
  MessageSquare,
  Users,
  Sparkles,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Heart,
  Star,
} from 'lucide-react';

const services = [
  {
    id: 'ot',
    icon: <Hand className="h-8 w-8" />,
    color: 'green',
    title: 'Occupational Therapy',
    tagline: 'Building independence through purposeful activity',
    description:
      'Our occupational therapy services support children in developing the skills needed for daily life — from fine motor tasks like writing and self-care to sensory regulation and school readiness.',
    areas: [
      'Fine and gross motor skill development',
      'Sensory processing and integration',
      'Self-care and daily living skills',
      'Handwriting and visual-motor skills',
      'School readiness and classroom participation',
      'Emotional regulation strategies',
    ],
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
  },
  {
    id: 'sensory',
    icon: <Sparkles className="h-8 w-8" />,
    color: 'teal',
    title: 'Sensory Integration',
    tagline: 'Helping children feel comfortable in their world',
    description:
      'Designed for children who experience sensory sensitivities or seeking behaviors, our sensory integration therapy uses evidence-based techniques to help the nervous system process sensory information more effectively.',
    areas: [
      'Tactile, vestibular, and proprioceptive processing',
      'Sensory diet planning for home and school',
      'Auditory and visual sensitivity support',
      'Self-regulation through sensory strategies',
      'Environment modification guidance',
      'Parent and caregiver coaching',
    ],
    image: 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg',
  },
  {
    id: 'social',
    icon: <Users className="h-8 w-8" />,
    color: 'blue',
    title: 'Social Skills Groups',
    tagline: 'Learning together, growing together',
    description:
      'Our structured social skills groups bring children together in small, supportive settings to practice real-world social interactions. Led by our occupational therapist, these groups blend play with purposeful skill-building.',
    areas: [
      'Turn-taking and sharing',
      'Reading social cues and body language',
      'Conversation and peer interaction',
      'Conflict resolution and flexible thinking',
      'Emotional awareness and empathy',
      'Friendship-building strategies',
    ],
    image: 'https://images.pexels.com/photos/8613261/pexels-photo-8613261.jpeg',
  },
  {
    id: 'developmental',
    icon: <Brain className="h-8 w-8" />,
    color: 'orange',
    title: 'Developmental Support',
    tagline: 'Meeting each child where they are',
    description:
      'Comprehensive developmental support for children with autism spectrum disorder, ADHD, developmental delays, and other differences. We create individualized plans that align with each child\'s unique profile and family goals.',
    areas: [
      'ASD and neurodevelopmental support',
      'ADHD and executive function strategies',
      'Developmental milestone support',
      'Transition planning (school, routines)',
      'Behavioral support and positive reinforcement',
      'Collaboration with schools and other providers',
    ],
    image: 'https://images.pexels.com/photos/8612967/pexels-photo-8612967.jpeg',
  },
  {
    id: 'parent',
    icon: <Heart className="h-8 w-8" />,
    color: 'rose',
    title: 'Parent & Caregiver Coaching',
    tagline: 'Empowering families with tools and confidence',
    description:
      'We believe parents are the most powerful advocates for their children. Our coaching sessions provide families with practical strategies, education, and emotional support to carry therapeutic gains into everyday life.',
    areas: [
      'Understanding your child\'s sensory profile',
      'Home routine and environment strategies',
      'Advocacy in school and community settings',
      'Goal-setting and progress monitoring',
      'Stress management for caregivers',
      'Connecting with community resources',
    ],
    image: 'https://images.pexels.com/photos/8612984/pexels-photo-8612984.jpeg',
  },
  {
    id: 'speech',
    icon: <MessageSquare className="h-8 w-8" />,
    color: 'amber',
    title: 'Speech & Communication Support',
    tagline: 'Finding their voice, building connections',
    description:
      'In partnership with licensed speech-language pathologists, we offer co-treatment and consultation to support children with communication challenges, including expressive and receptive language delays.',
    areas: [
      'Expressive and receptive language',
      'Augmentative and alternative communication (AAC)',
      'Pragmatic and social communication',
      'Feeding and oral motor skills',
      'Co-treatment with occupational therapy',
      'Family training and home practice plans',
    ],
    image: 'https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; light: string; icon: string }> = {
  green: {
    bg: 'bg-green-600',
    text: 'text-green-700',
    border: 'border-green-200',
    light: 'bg-green-50',
    icon: 'text-green-600',
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-teal-700',
    border: 'border-teal-200',
    light: 'bg-teal-50',
    icon: 'text-teal-600',
  },
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-700',
    border: 'border-blue-200',
    light: 'bg-blue-50',
    icon: 'text-blue-600',
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-700',
    border: 'border-orange-200',
    light: 'bg-orange-50',
    icon: 'text-orange-500',
  },
  rose: {
    bg: 'bg-rose-500',
    text: 'text-rose-700',
    border: 'border-rose-200',
    light: 'bg-rose-50',
    icon: 'text-rose-500',
  },
  amber: {
    bg: 'bg-amber-500',
    text: 'text-amber-700',
    border: 'border-amber-200',
    light: 'bg-amber-50',
    icon: 'text-amber-500',
  },
};

const faqs = [
  {
    q: 'How do I know if my child needs therapy services?',
    a: 'If your child is experiencing challenges with sensory processing, motor skills, social interaction, self-care, or daily routines that affect their quality of life or participation at home or school, a consultation can help clarify next steps. You do not need a referral to reach out to us.',
  },
  {
    q: 'What ages do you serve?',
    a: 'We primarily serve children ages 2–12, though we are happy to discuss your child\'s specific needs regardless of age. Early intervention is encouraged, but it is never too late to seek support.',
  },
  {
    q: 'How is therapy structured?',
    a: 'Each child receives an individualized evaluation before services begin. From there, we develop a personalized treatment plan with clear, measurable goals. Sessions typically run 45–60 minutes and can be offered individually or in small groups depending on the service.',
  },
  {
    q: 'Do you accept insurance?',
    a: 'We are currently an out-of-network provider. We can provide documentation (a superbill) that you may submit to your insurance for possible reimbursement. We also offer a sliding scale for families who qualify. Please contact us to discuss options.',
  },
  {
    q: 'Can parents observe sessions?',
    a: 'Yes. We strongly encourage family involvement. You may observe sessions, and we dedicate time at the end of each appointment to share observations, strategies, and home practice recommendations.',
  },
  {
    q: 'How long does therapy take to see results?',
    a: 'Progress varies for every child. Some families notice changes within a few sessions; others benefit from longer-term support. We regularly review goals and communicate progress so you always have a clear picture of how your child is advancing.',
  },
];

const TherapyServicesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-teal-50 py-20 mb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Expert-Led Pediatric Therapy
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Therapy Services <br />
                <span className="text-green-600">Built Around Your Child</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Led by Jysseka Campbell-George, an occupational therapist with over a decade of
                experience, our therapy services are grounded in evidence-based practice and shaped
                by genuine care for every child and family we serve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Request a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#services"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  Explore Services
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg"
                alt="Therapist working with child"
                className="w-full h-[420px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 max-w-xs">
                <div className="bg-green-100 rounded-full p-2">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Evidence-Based Practice</p>
                  <p className="text-xs text-gray-500">OT-led, individualized care</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="container-custom mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Therapy Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From sensory integration to social skills, our services address the full range of
            pediatric developmental needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = colorMap[service.color];
            const isActive = activeService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                  isActive ? colors.border : 'border-transparent'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className={`absolute top-4 left-4 ${colors.bg} text-white rounded-xl p-2.5 shadow-md`}>
                    {service.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>{service.tagline}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>

                  <button
                    onClick={() => setActiveService(isActive ? null : service.id)}
                    className={`w-full flex items-center justify-between text-sm font-semibold ${colors.text} py-2 px-3 rounded-lg ${colors.light} hover:opacity-80 transition-opacity`}
                  >
                    <span>{isActive ? 'Hide details' : 'What we address'}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 space-y-2 overflow-hidden"
                      >
                        {service.areas.map((area, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${colors.icon}`} />
                            {area}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-20 mb-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. We walk alongside your family every step of the way.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-green-200 z-0" />

            {[
              {
                step: '01',
                title: 'Initial Consultation',
                desc: 'A free 20-minute call to discuss your child\'s needs and determine if our services are a good fit.',
              },
              {
                step: '02',
                title: 'Comprehensive Evaluation',
                desc: 'A thorough assessment of your child\'s strengths and challenges to guide treatment planning.',
              },
              {
                step: '03',
                title: 'Individualized Plan',
                desc: 'A personalized treatment plan with clear goals developed collaboratively with your family.',
              },
              {
                step: '04',
                title: 'Ongoing Support',
                desc: 'Regular sessions, progress reviews, and home strategies to maximize carry-over.',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-white border-4 border-green-200 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <span className="text-2xl font-bold text-green-600">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-custom mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We have answers.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-10 md:p-14 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Every child deserves thoughtful, personalized support. Reach out today to schedule a
            free consultation and discover how our therapy services can help your child thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center gap-2"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/classes"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              View Our Classes
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TherapyServicesPage;
