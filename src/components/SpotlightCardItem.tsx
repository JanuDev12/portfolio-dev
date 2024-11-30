import React from 'react'
import { Spotlight, SpotlightItem } from './ui/CardSpotlight';

function SpotlightCardItem() {
  return (
    <Spotlight
      className={
        "grid grid-cols-1  md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 h-full"
      }
      HoverFocusSpotlight={true}
    >
      <SpotlightItem className="rounded-md border border-neutral-400 col-span-1 row-span-2">
        
        <div className="">
          <h2>Content 1</h2>
        </div>
      </SpotlightItem>
      <SpotlightItem className="rounded-md border border-neutral-400 col-start-2">
        
        <h1>Content 2</h1>
      </SpotlightItem>
      <SpotlightItem className="rounded-md border border-neutral-400 row-span-1 col-start-3 ">
        
        <h1>Content3</h1>
      </SpotlightItem>
      <SpotlightItem className=" rounded-md border border-neutral-400 col-span-2 col-start-2 row-start-2">
        
        <h1>Content4</h1>
      </SpotlightItem>
    </Spotlight>
  );
}

export default SpotlightCardItem