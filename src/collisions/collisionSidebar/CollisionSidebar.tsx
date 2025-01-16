import { ICollision } from "../../getSatelliteLocations";
import { CollisionList } from "./CollisionList";
import { CollisionDetails } from "./CollisionDetails";

type CollisionSidebarProps = {
  selectedCollision: ICollision | null;
  onClickCollision: (collision: ICollision | null) => void;
  collisionData: ICollision[];
  // onClickSatellite: (satellite: ISatellite | null) => void;
  // satelliteData: ISatellite[];
};

export function CollisionSidebar({
  selectedCollision,
  collisionData,
  onClickCollision,
}: CollisionSidebarProps) {
  if (!selectedCollision) {
    return (
      <CollisionList
        collisionData={collisionData}
        onClickCollision={onClickCollision}
        selectedCollision={selectedCollision}
      />
    );
  }

  return (
    <CollisionDetails
      selectedCollision={selectedCollision}
      onClearCollision={() => onClickCollision(null)}
      // onClickCollision={onClickCollision}
    />
  );
}
