import { ICollision, ISatellite } from "../../getSatelliteLocations";
import { CollisionList } from "./CollisionList";
import { CollisionDetails } from "./CollisionDetails";

type CollisionSidebarProps = {
  selectedCollision: ICollision | null;
  onClickCollision: (collision: ICollision | null) => void;
  collisionData: ICollision[];
  satelliteLookup: Record<string, ISatellite>;
  satelliteOne: ISatellite | null;
  satelliteTwo: ISatellite | null;
  // onClickSatellite: (satellite: ISatellite | null) => void;
  // satelliteData: ISatellite[];
};

export function CollisionSidebar({
  selectedCollision,
  collisionData,
  onClickCollision,
  satelliteLookup,
  satelliteOne,
  satelliteTwo,
}: CollisionSidebarProps) {
  if (!selectedCollision) {
    return (
      <CollisionList
        collisionData={collisionData}
        onClickCollision={onClickCollision}
        selectedCollision={selectedCollision}
        satelliteLookup={satelliteLookup}
      />
    );
  }

  return (
    <CollisionDetails
      selectedCollision={selectedCollision}
      onClearCollision={() => onClickCollision(null)}
      satelliteLookup={satelliteLookup}
    />
  );
}
