import React from 'react';

interface HashtagChipProps {
  hashtag: string;
  onClick?: (hashtag: string) => void;
  variant?: 'default' | 'clickable';
}

export function HashtagChip({ hashtag, onClick, variant = 'default' }: HashtagChipProps) {
  const handleClick = () => {
    if (onClick && variant === 'clickable') {
      onClick(hashtag);
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f6f9ff] text-[#3843ff] border border-[#d7d9ff] ${
        variant === 'clickable' ? 'cursor-pointer hover:bg-[#e6ebff] hover:border-[#3843ff] transition-colors' : ''
      }`}
    >
      {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
    </span>
  );
}

interface HashtagListProps {
  hashtags: string[];
  limit?: number;
  onHashtagClick?: (hashtag: string) => void;
  showExpandable?: boolean;
}

export function HashtagList({ hashtags, limit, onHashtagClick, showExpandable = false }: HashtagListProps) {
  const [expanded, setExpanded] = React.useState(false);
  
  if (!hashtags || hashtags.length === 0) return null;

  const displayedHashtags = limit && !expanded ? hashtags.slice(0, limit) : hashtags;
  const hasMore = limit && hashtags.length > limit;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayedHashtags.map((hashtag, index) => (
        <HashtagChip
          key={index}
          hashtag={hashtag}
          onClick={onHashtagClick}
          variant={onHashtagClick ? 'clickable' : 'default'}
        />
      ))}
      
      {hasMore && !expanded && showExpandable && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs text-[#3843ff] font-medium hover:underline"
        >
          + {hashtags.length - limit!} more
        </button>
      )}
      
      {expanded && hasMore && showExpandable && (
        <button
          onClick={() => setExpanded(false)}
          className="text-xs text-[#686873] font-medium hover:underline"
        >
          Show less
        </button>
      )}
    </div>
  );
}