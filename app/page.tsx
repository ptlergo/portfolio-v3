'use client';

import { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from 'gsap/Draggable';
import { projects } from "../constants";
import Navbar from "./components/Navbar";
import Image from "next/image";
export default function Home() {

  gsap.registerPlugin(Draggable);
  const containerRef = useRef(null);

  useGSAP(() => {
    Draggable.create('.target', {
      type: 'x,y',                  // Allows dragging both horizontally and vertically
      bounds: containerRef.current, // Keeps the box contained inside the parent container
      inertia: false,               // Set to true if using the premium InertiaPlugin
      onDragStart: () => console.log('Drag started!'),
      onDragEnd: () => console.log('Drag ended!'),
    });
  }, { scope: containerRef });

  return (
    <main className='flex min-h-screen' ref={containerRef} >
      <h1>Home page</h1>
      <div className="target w-fit h-30">
        <img src={projects[0].imgPath} alt="" className="spin h-full" />
      </div>
      <div className="target w-fit h-30">
        <img src={projects[1].imgPath} alt="" className="spin h-full" />
      </div>
      < Navbar />
    </main>
  );
}
