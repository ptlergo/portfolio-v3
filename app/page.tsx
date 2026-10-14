'use client';

import { useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from 'gsap/Draggable';
import { test } from "../constants";
import Navbar from "./components/Navbar";
import Link from 'next/link';


export default function Home() {

  // will set the active item props
  const [activeItemProps, setActiveItemProps] = useState(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Sample data for draggable items
  const [items] = useState(test);

  useGSAP(() => {
    gsap.registerPlugin(Draggable);

    const draggableTargets = gsap.utils.toArray<HTMLElement>('.draggable-item');
    const dropZone = dropZoneRef.current;

    if (!dropZone) return;

    Draggable.create(draggableTargets, {
      bounds: containerRef.current,
      inertia: true,

      // Fires continuously as the item moves
      onDrag: function () {
        if (this.hitTest(dropZone, "50%")) {
          // Extract the unique ID from the DOM dataset
          const itemId = this.target.getAttribute('data-id');

          // Find the rich React properties matching that ID
          const matchedComponent = items.find((i) => i.id === itemId);

          if (matchedComponent) {
            console.log("Live dragging properties over zone:", matchedComponent);
          }
        }
      },

      // Fires when the user lets go of the item
      onRelease: function () {
        let detectedComponent: typeof items[0] | null = null;

        // Loop through all items to see which one settled in the zone
        draggableTargets.forEach((el) => {
          if (Draggable.hitTest(el, dropZone, "50%")) {
            const itemId = el.getAttribute('data-id');
            const found = items.find((i) => i.id === itemId);
            if (found) detectedComponent = found;
          }
        });

        // Update Next.js state to reflect the dropped item's properties
        setActiveItemProps(detectedComponent);
      },
    });
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="relative w-full p-8 flex gap-8">

        {/* Draggable Components */}
        <div className="flex flex-col gap-4 w-1/3">
          {items.map((item) => (
            <div
              key={item.id}
              data-id={item.id} // 3. The bridge between the DOM and React State
              className="draggable-item p-4 bg-slate-700 text-white rounded-lg shadow-md cursor-grab active:cursor-grabbing border border-slate-600"
            >
              <img src={item.imgPath} alt={item.name} className="mt-2 w-full h-auto" />
            </div>
          ))}
        </div>

        {/* The Target Drop Zone */}
        <div className="flex-1 flex flex-col gap-4">
          <div
            ref={dropZoneRef}
            className="drop-zone h-64 border-4 border-dashed border-slate-500 rounded-2xl flex items-center justify-center text-slate-400"
          >
            {activeItemProps ? `Zone occupied by: ${activeItemProps.name}` : 'Drop an item here'}
          </div>


        </div>
        {/* 4. Displaying the Component Properties in Next.js UI */}
        {activeItemProps && (
          <div className="p-4">
            <h3 className="font-bold text-lg">Details</h3>
            <pre className="mt-2 text-sm  p-3 rounded font-mono">
              {/* {JSON.stringify(activeItemProps, null, 2)} */}
              <p>
                {activeItemProps.details}
              </p>
              <Link href={activeItemProps.linkPath}>Learn more</Link>
            </pre>
          </div>
        )}
      </div>
    </> 
  );
}
