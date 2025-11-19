"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type Category = {
  id: number;
  name: string;
};
export default function Header({
  categories = [],
}: {
  categories?: Category[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h1>Logo</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm md:text-base">
          <a
            href="#home"
            className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
          >
            Home
          </a>

          <div className="relative group">
            <a
              href="#gallery"
              className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
            >
              Products
            </a>

            <div className="absolute right-0 mt-2 w-max bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-x-1/4">
              <div className="flex space-x-6 px-6 py-4">
                {categories.map((item) => (
                  <a
                    key={item.id}
                    href={`/category/${item.id}`}
                    className="whitespace-nowrap px-3 py-2 text-xs text-[#85582c] hover:bg-[#ba7b0b] hover:text-white rounded-full transition "
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#customers"
            className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
          >
            Customers
          </a>
          <a
            href="#contacts"
            className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
          >
            Contacts
          </a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="transparent"
              className="md:hidden px-3 py-2"
            >
              <Icon icon="radix-icons:hamburger-menu" className="size-8" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="p-6 space-y-6">
            <h2 className="text-xl font-bold mb-4">Menu</h2>

            <nav className="flex flex-col space-y-4">
              <SheetClose asChild>
                <a
                  href="#home"
                  className="px-4 py-2 rounded-lg hover:bg-[#ba7b0b] hover:text-white transition block"
                >
                  Home
                </a>
              </SheetClose>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="products">
                  <AccordionTrigger className="text-left px-4 py-2 rounded-lg hover:bg-[#ba7b0b] hover:text-white transition">
                    Products
                  </AccordionTrigger>
                  <AccordionContent className="pl-6 pt-2 pb-4 sapce-y-2">
                    {categories.map((item) => (
                      <SheetClose key={item.id} asChild>
                        <a
                          href={`/category/${item.id}`}
                          className="block px-3 py-2 rounded-lg text-sm hover:bg-[#ba7b0b] hover:text-white"
                        >
                          {item.name}
                        </a>
                      </SheetClose>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <SheetClose asChild>
                <a
                  href="#customers"
                  className="px-4 py-2 rounded-lg hover:bg-[#ba7b0b] hover:text-white transition block"
                >
                  Customers
                </a>
              </SheetClose>

              <SheetClose asChild>
                <a
                  href="#contacts"
                  className="px-4 py-2 rounded-lg hover:bg-[#ba7b0b] hover:text-white transition block"
                >
                  Contacts
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
