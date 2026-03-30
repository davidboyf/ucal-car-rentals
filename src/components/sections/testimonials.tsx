import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="py-24 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#D4A017] text-sm uppercase tracking-[0.2em] mb-3">Reviews</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Don&apos;t take our word for it. Here&apos;s what travelers and locals say about Ucal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#111827] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#D4A017]/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#D4A017] fill-[#D4A017]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#D4A017]/30" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <div>
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
                <span className="text-gray-600 text-xs">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional two testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {testimonials.slice(3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#111827] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#D4A017]/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#D4A017] fill-[#D4A017]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#D4A017]/30" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <div>
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
                <span className="text-gray-600 text-xs">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
