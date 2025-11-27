/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 12:10:19
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:55:41
 * @FilePath: src/components/Footer.tsx
 * @Description: 页脚组件
 */
import IcpInfo from '@/components/IcpInfo';
import Motto from '@/components/Motto';

const Footer = () => {
  return (
    <>
      <div className="flex justify-center my-4">
        <Motto />
      </div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            kurous
          </p>
          <IcpInfo />
        </aside>
      </footer>
    </>
  );
};

export default Footer;
