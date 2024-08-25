import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import AnimatedOutlet from '../management/dashboard/animatedOutlet/animatedOutlet';
import styles from './skeletonLoader.module.css';

const SkeletonLoader = ({ height, width }) => (
  <AnimatedOutlet>
    <div className={styles.skeletonContainer}>
      <Skeleton
      className={styles.tall}
        borderRadius={5}
        height={450}
        count={1}
        baseColor='#2c3040'
        highlightColor='#464c66'
      />
      <Skeleton
        className={styles.tall}
        borderRadius={5}
        height={200}
        count={1}
        baseColor='#2c3040'
        highlightColor='#464c66'
      />
    </div>
  </AnimatedOutlet>
);

export default SkeletonLoader;
