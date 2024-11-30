import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react';
import { Review } from '@/types/google';

type HomeSliderProps = {
    reviews: Review[]
}

export default function HomeSlider({ reviews }: HomeSliderProps) {
    const [sliderRef, instanceRef] = useKeenSlider({
        slideChanged() {
            console.log('Slide changed');
        },
        created() {
            // Initialize the slide count when the slider is created
            const count = instanceRef.current?.slides.length;
            const activeIndex = (instanceRef.current?.track?.details?.rel ?? 0) + 1;
            const keenSliderCount = document.getElementById('keen-slider-count');
            if (keenSliderCount && count !== undefined) {
                keenSliderCount.textContent = count.toString();
            }
            const keenSliderActiveIndex = document.getElementById('keen-slider-active');
            if (keenSliderActiveIndex && activeIndex !== undefined) {
                keenSliderActiveIndex.textContent = activeIndex.toString();
            }
        },
        updated() {
            // Update the active slide when the slider is updated\
            const activeIndex = (instanceRef.current?.track?.details?.rel ?? 0) + 1;
            const keenSliderActiveIndex = document.getElementById('keen-slider-active');
            if (keenSliderActiveIndex && activeIndex !== undefined) {
                keenSliderActiveIndex.textContent = activeIndex.toString();
            }
        },
    });

    const goToPrev = () => {
        instanceRef.current?.prev();
    };

    const goToNext = () => {
        instanceRef.current?.next();
    };

    const star = (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Read trusted reviews from our customers
                </h2>

                <div className="mt-8">
                <div id="keen-slider" className="keen-slider">
                    {reviews && reviews.slice(0,3).map((review, key) => {
                        return <div key={key} className="keen-slider__slide opacity-80 transition-opacity duration-500">
                            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                                <div className="flex items-center gap-4">
                                <img
                                    alt=""
                                    src={ review.profile_photo_url }
                                    className="size-14 rounded-full object-cover"
                                />

                                <div>
                                    <div className="flex justify-center gap-0.5 text-gray-500">
                                        <div className={review.rating >= 1 ? "text-green-500" : ''}>
                                            { star }
                                        </div>
                                        <div className={review.rating >= 2 ? "text-green-500" : ''}>
                                            { star }
                                        </div>
                                        <div className={review.rating >= 3 ? "text-green-500" : ''}>
                                            { star }
                                        </div>
                                        <div className={review.rating >= 4 ? "text-green-500" : ''}>
                                            { star }
                                        </div>
                                        <div className={review.rating >= 5 ? "text-green-500" : ''}>
                                            { star }
                                        </div>
                                    </div>

                                    <p className="mt-0.5 text-lg font-medium text-gray-900">{ review.author_name }</p>
                                </div>
                                </div>

                                <p className="mt-4 text-gray-700">{ review.text }</p>
                            </blockquote>
                        </div>
                    })}
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                    aria-label="Previous slide"
                    id="keen-slider-previous"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    </button>

                    <p className="w-16 text-center text-sm text-gray-700">
                    <span id="keen-slider-active"></span>
                    /
                    <span id="keen-slider-count"></span>
                    </p>

                    <button
                    aria-label="Next slide"
                    id="keen-slider-next"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                    >
                    <svg
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
        </section>
    )
}
