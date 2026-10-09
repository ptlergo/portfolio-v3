import { projects } from '../../constants';

type DragItemProps = {
  projectNum: number;
};

const DragItem = ({ projectNum }: DragItemProps) => {
  return (
    <div className="target w-fit h-30">
      <img src={projects[projectNum].imgPath} alt="" className="spin h-full" />
    </div>
  );
};

export default DragItem;