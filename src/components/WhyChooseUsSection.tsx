const reasons = [
  { icon: '🚘', title: '100% Focused on Vehicle Branding' },
  { icon: '📍', title: 'Deep Local Knowledge of Nepal’s Transit System' },
  { icon: '🎨', title: 'Bold, Creative Design Work' },
  { icon: '🧠', title: 'Strategy to Execution - All Under One Roof' },
  { icon: '🔁', title: 'Regular Route Rotation for Maximum Visibility' },
  { icon: '💼', title: 'Proven Success With Top Brands' },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Title and Quote */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              We’re Not Just Another Ad Agency — We’re Your Mobile Branding Experts
            </h2>
            <blockquote className="mt-8 border-l-4 border-red-500 pl-6 italic text-xl text-gray-700">
              “Your brand won’t just be seen. It will be remembered.”
            </blockquote>
          </div>

          {/* Right Column: Reasons List */}
          <div className="space-y-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                  <span className="text-xl">{reason.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{reason.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}