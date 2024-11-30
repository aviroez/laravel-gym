import { PageProps, Plan } from '@/types';
import { Head } from '@inertiajs/react';
import Slider from './Slider';
import useTranslations from '@/Hooks/jsTranslation';
import Footer from './Footer';
import { Review } from '@/types/google';
import { formatCurrency } from '@/utils/helpers';

type HomeIndexProps = {
    reviews: Review[],
    latestPlans: Plan[],
};

export default function HomeIndex(
    { auth, reviews, settings, storage_url, latestPlans }: PageProps & HomeIndexProps
) {
    const { t } = useTranslations();

    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const setting = Object.entries(settings).find((val: any, key: any) => val[0] === 'front_image');
    let frontImage = 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
    if (setting && setting[1] && setting[1].value) {
        frontImage = storage_url + '/' + setting[1].value;
    }

    return (
        <>
            <Head title="Home" />

            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <section
                    className={`relative bg-[url(${frontImage})] bg-cover bg-center bg-no-repeat`}
                    style={{ backgroundImage: `url('${frontImage}')` }}
                >
                    <div
                        className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                    ></div>

                    <div
                        className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                    >
                        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                            <h1 className="text-3xl font-extrabold sm:text-5xl">
                                Let us find your

                                <strong className="block font-extrabold text-blue-700"> Forever Home. </strong>
                            </h1>

                            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
                                numquam ea!
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4 text-center">
                                <a
                                href="#"
                                className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                                >
                                Get Started
                                </a>

                                <a
                                href="#"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                                >
                                Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 justify-center bg-slate-100">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
                        {latestPlans && latestPlans.slice(0, 3).map((plan) => {
                            return (
                                <div key={plan.id} className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
                                    <div className="p-6 sm:px-8">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            { plan.name }
                                            <span className="sr-only">Plan</span>
                                        </h2>
        
                                        <p className="mt-2 text-gray-700">{ plan.description }</p>
        
                                        <p className="mt-2 sm:mt-4">
                                            <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> { formatCurrency(plan.price) } </strong>
        
                                            <span className="text-sm font-medium text-gray-700">{plan.unit && '/' + t(plan.unit)}</span>
                                        </p>
        
                                        <a
                                        className="mt-4 block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 sm:mt-6"
                                        href="#"
                                        >
                                        Get Started
                                        </a>
                                    </div>
        
                                    <div className="p-6 sm:px-8 hi">
                                        <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
        
                                        <ul className="mt-2 space-y-2 sm:mt-4">
                                            <li className="flex items-center gap-1">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-5 text-blue-700"
                                                >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
            
                                                <span className="text-gray-700"> Free Training </span>
                                            </li>
            
                                            <li className="flex items-center gap-1">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-5 text-blue-700"
                                                >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
            
                                                <span className="text-gray-700"> Full Wifi </span>
                                            </li>
            
                                            <li className="flex items-center gap-1">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-5 text-blue-700"
                                                >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
            
                                                <span className="text-gray-700"> Unlimited support </span>
                                            </li>
            
                                            <li className="flex items-center gap-1">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-5 text-red-700"
                                                >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
            
                                                <span className="text-gray-700"> Personal Training </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <Slider reviews={reviews} />
                
                <Footer user={auth.user} settings={settings} />
            </div>
        </>
    );
}
