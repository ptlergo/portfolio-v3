'use client';

import { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from 'gsap/Draggable';
import { projects } from "../constants";
import Navbar from "./components/Navbar";
import DragItem from './components/DragItem';
export default function Home() {

  gsap.registerPlugin(Draggable);
  const containerRef = useRef(null);
  

  useGSAP(() => {
    Draggable.create('.target', {
      type: 'x,y',                  // Allows dragging both horizontally and vertically
      bounds: containerRef.current, // Keeps the box contained inside the parent container
      inertia: false,               // Set to true if using the premium InertiaPlugin
      onDragEnd: function() {
        if (this.hitTest('.drop-zone', '50%')) {
          console.log('Drag dropped in zone!')
          // pass in data from targeted object

        } else console.log('not in zone!')
      },
    });
  }, { scope: containerRef });

  return (
    <main className='flex min-h-screen' ref={containerRef} >
      <h1>Home page</h1>
      <DragItem projectNum={0} />
      <DragItem projectNum={1} />
    
      <div className="drop-zone w-80 h-80 bg-amber-600">
        dropZoneRef
      </div>
      <div className="drop-zone-details">
        drop zone dynamic details
      </div>
      < Navbar />
    </main>
  );
}
