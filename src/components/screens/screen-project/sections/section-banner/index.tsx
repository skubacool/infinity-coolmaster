import { useVmScreenProject } from '../../../../../stores/vm-screen-project';
import Loading from '../../../../_commons/loading';

const SectionBanner = () => {
  const vmScreenProject = useVmScreenProject();
  const { loading, project } = vmScreenProject;
  const { banner } = project ?? {};

  return (
    <section
      className="h-[320px] lg:h-[520px] bg-gradient-hero flex flex-col justify-center items-center"
      style={{
        background: banner
          ? `url(${banner}) no-repeat center/cover`
          : undefined,
      }}
    >
      {loading && <Loading />}
    </section>
  );
};

export default SectionBanner;
