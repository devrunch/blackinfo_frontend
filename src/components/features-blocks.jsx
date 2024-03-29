import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import FeaturesBg from '../assets/images/features-bg.png'
import UpImg from '../assets/images/upload.svg'
import heatmp from '../assets/images/heatmap.png'
import clust from '../assets/images/cluster.png'
export default function Features() {

  const [tab, setTab] = useState(1)

  const tabs = useRef(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
    <section className="relative bg-gray-200 mb-4" >
      <div className="absolute inset-0 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h-10 text-4xl font-extrabold mb-4 text-gray-900">SITE INVESTIGATION</h1>
            <p className="text-xl text-gray-900">Your inputs aid in comprehensive accident analysis, leading to better understanding and prevention strategies for safer road</p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">

            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="font-bold text-xl mb-3 text-gray-900">STEPS TO DOCUMENT THE SPOTS</h3>

              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center justify-between text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-gray-700 shadow-md border-gray-700 hover:bg-gray-600' : 'bg-gray-800 border-transparent'}`}
                  href="#0" 
                  onClick={(e) => { e.preventDefault(); setTab(1); }}
                >
                  <div>
                    <div className="text-gray-200">
                      <ul className='list-disc ml-3'>
                        <li>Capture Overview shots</li>
                        <li>Road marking and Signage</li>
                        <li>Record landmarks and feature</li>
                        <li>Road condition and debris</li>
                        <li>Damage Details</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <img src={UpImg} className='w-4 h-4' />
                  </div>
                </a>
               

              </div>
            </div>

            {/* Tabs items */}
            <div className="mt-auto max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div className="relative flex flex-col text-center lg:text-right" data-aos="zoom-y-out" ref={tabs}>
                  {/* Item 1 */}
                  <Transition
                    show={tab === 1}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-0"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-0"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <img className="md:max-w-none mx-auto rounded" src={heatmp} width={500} height="462" alt="Features bg" />
                    </div>
                  </Transition>
                  {/* Item 2 */}
                  <Transition
                    show={tab === 2}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-0"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-0"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <img className="md:max-w-none mx-auto rounded" src={clust} width={500} height="462" alt="Features bg" />
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}