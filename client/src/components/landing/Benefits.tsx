import React from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import { CheckCircle, ArrowRight } from "lucide-react";

type Bullet = {
  title: string;
  desc: string;
  icon: React.ReactElement;
};

type Data = {
  image: string;
  title: string;
  desc: string;
  bullets: Bullet[];
  cta?: {
    text: string;
    onClick?: () => void;
  };
};

type BenefitsProps = {
  imgPos?: "left" | "right";
  data: Data;
};

export const Benefits: React.FC<BenefitsProps> = ({
  imgPos = "left",
  data,
}) => {
  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap">
      <>
        <div
          className={`flex items-center justify-center w-full lg:w-1/2 ${
            imgPos === "right" ? "lg:order-1" : ""
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl blur-xl opacity-60 scale-110"></div>
            <div className="relative p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
              <Image
                src={data.image}
                width={521}
                height={521}
                alt={data.title}
                className="object-cover rounded-2xl"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R2ZZiXWmUsW5x7zHNdbWKOe3VuoKWKvMXYNPwv25USmqlEJGHoUbhj2M="
              />
            </div>

            {/* Floating indicators */}
            <div className="absolute -top-4 -right-4 p-3 bg-green-500 text-white rounded-full shadow-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center w-full lg:w-1/2 ${
            imgPos === "right" ? "lg:justify-end" : ""
          }`}
        >
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                {data.title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                {data.desc}
              </p>
            </div>

            <div className="w-full mt-5">
              {data.bullets.map((item, index) => (
                <Benefit
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  icon={item.icon}
                />
              ))}
            </div>

            {data.cta && (
              <div className="mt-8">
                <button
                  className="inline-flex items-center px-6 py-3 text-base font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200 group"
                  onClick={data.cta.onClick}
                  type="button"
                >
                  {data.cta.text}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    </Container>
  );
};

type BenefitProps = {
  title: string;
  desc: string;
  icon: React.ReactElement;
};

function Benefit({ title, desc, icon }: BenefitProps) {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-blue-500 rounded-md w-11 h-11">
        {React.cloneElement(icon as React.ReactElement<any>, {
          className: "w-7 h-7 text-blue-50",
        })}
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h4>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}
