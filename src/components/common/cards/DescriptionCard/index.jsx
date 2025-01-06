import clsx from 'clsx';
import { Link } from 'react-router-dom';

import Cover from '@/components/common/Cover';
import styles from './descriptionCard.module.scss';
import { comicUrl } from '@/routes';

function DescriptionCard({ comic }) {
  return (
    <div className="overflow-hidden rounded shadow-2xl">
      {/* Cover */}
      <div className="relative overflow-hidden rounded">
        <Cover comic={comic} />

        {/* Cover info */}
        <Link
          to={comicUrl(comic.name, comic.id)}
          className={clsx(
            styles['card-overlay'],
            'absolute inset-0 flex cursor-pointer flex-col justify-between !text-white'
          )}>
          {/* Description */}
          <div className="my-2 overflow-y-auto">
            <div className={clsx(styles['description'], 'hidden gap-y-2 px-2')}>
              <p>{comic.description ? comic.description : 'No description'}</p>
            </div>
          </div>

          {/* Info */}
          <div className={clsx(styles['card-info'], 'p-2')}>
            <div className="flex flex-col">
              <span
                className={clsx(
                  styles['card-name'],
                  'limit-line-1 break-all font-semibold'
                )}>
                {comic.name}
              </span>
              <span
                className={clsx(
                  styles['card-author'],
                  'limit-line-1 break-all text-xs text-gray-300'
                )}>
                {comic.author}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DescriptionCard;
