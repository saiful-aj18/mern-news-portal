import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  LoaderCircle,
  MessageSquare,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
            Get in touch
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500 sm:text-base">
            Have a question, story tip or feedback? Send us a
            message and our team will get back to you.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:px-6 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Contact Information */}
          <section className="lg:col-span-4">
            <div className="h-full border border-stone-200 bg-cyan-950 p-6 text-stone-300 sm:p-8">
              <div className="flex h-10 w-10 items-center justify-center bg-red-600 text-white">
                <MessageSquare size={19} />
              </div>

              <h2 className="mt-5 text-2xl font-black text-white">
                Let&apos;s talk
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-200">
                Whether you have feedback about our coverage or
                want to share a story tip, we&apos;d like to hear
                from you.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-cyan-800 text-red-500">
                    <Mail size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-stone-300">
                      Email
                    </p>

                    <p className="mt-1 text-sm text-stone-200">
                      hello@newsroom.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-cyan-800 text-red-500">
                    <Phone size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-stone-300">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-stone-200">
                      +880 1234 567890
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-cyan-800 text-red-500">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-stone-300">
                      Office
                    </p>

                    <p className="mt-1 text-sm leading-6 text-stone-200">
                      Newsroom Media House
                      <br />
                      Chattogram, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-cyan-800 pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-300">
                  Office Hours
                </p>

                <p className="mt-2 text-sm text-stone-300">
                  Sunday — Thursday
                </p>

                <p className="mt-1 text-sm text-stone-400">
                  9:00 AM — 6:00 PM
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="lg:col-span-8">
            <div className="border border-stone-200 bg-white">
              <div className="border-b border-stone-200 px-5 py-5 sm:px-7">
                <h2 className="font-bold text-stone-900">
                  Send a Message
                </h2>

                <p className="mt-1 text-xs text-stone-500">
                  Fill out the form below.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-7"
              >
                {submitted && (
                  <div className="mb-6 border-l-4 border-green-600 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                    Thanks for reaching out. Your message has
                    been submitted successfully.
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full border border-stone-300 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full border border-stone-300 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="mt-6">
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What would you like to talk about?"
                    className="w-full border border-stone-300 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
                  />
                </div>

                {/* Message */}
                <div className="mt-6">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-600"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="8"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    className="w-full resize-y border border-stone-300 bg-white px-3 py-3 text-sm leading-7 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-red-600"
                  />
                </div>

                {/* Submit */}
                <div className="mt-7 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 bg-cyan-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-600 sm:w-auto"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Contact;