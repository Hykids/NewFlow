import {load,extract} from '@node-rs/jieba';

load({userDict: "../extract.txt"})

// 分词
const text = "名著改编是艺术创新的一种路径和方式。《正红旗下》是作家老舍一部未完成的自传体小说，从北京曲剧《正红旗下》、上海话剧院的话剧《正红旗下》再到如今北京人民艺术剧院的话剧《正红旗下》，这部作品被艺术家们反复打磨，在舞台上不断与观众见面。作为北京人民艺术剧院2023年推出的第一部作品，《正红旗下》以老舍的回溯视角展现其身世家境，艺术再现了历史洪流中的中国百姓对和平生活的热爱、对民族精神的坚守。\n　　北京人民艺术剧院创作的话剧讲究深厚的生活基础，注重表达深刻的内心体验，追求塑造鲜明的人物形象。《正红旗下》是一部与这种艺术风格较为匹配的话剧。它有着浓郁的京味儿文化特色，具有鲜活的意象形象、浓郁的市井风情，语言充满妙趣机锋。《正红旗下》里那些性格鲜明的人物、喜剧性的戏剧冲突，让人忍俊不禁，笑过之后又生发思考。这是一台有戏剧性、趣味性、耐人寻味、启人省思的戏剧。就如剧作家曹禺的一句口头禅：“不简单哪，不简单！”透过故事表面，我们品味着戏剧丰厚的内涵。\n　　一部好戏，总有让人过目难忘的艺术形象、值得回味的戏剧故事。此剧的主题，从人物的命运和性格中自然而然地显现出来。老舍的语言独具特色，三言两语就把人物写活了。编剧李龙云对老舍原著笔触、语气、思路进行过深入研究，对京味儿文化特点十分熟稔。如在贫困中操劳的老舍母亲，聪明利落、一身本领却报国无门的福海二哥，连咳嗽都透着霸气的大姐的婆婆……剧中人物的故事与命运寄托着老舍的人文情怀。\n　　舞台呈现融入了北京人民艺术剧院导演和表演艺术创造的集体智慧。在艺术形式上，《正红旗下》多有探索和创新，它打破了以往同类题材戏剧的线性叙事和聚焦戏剧矛盾的惯例，以多视点、多层面、不同光影下的人生，组合出丰富剧情，让老舍作为剧中人、回忆者、讲述者、观察者、反思者融入其中。剧中，由濮存昕扮演的老舍从看着自己出生到看着父亲离世，从平凡日常到宏大国情，对于身边的每一位亲友、每一个事件，他都倾注了心血，赋予了人文关怀和悲悯同情。\n　　此剧重视现实物象的意象化表达，讲究京味儿话剧耐人咂摸的“味道”。戏曲程式化的穿插，音效的化用，增强了艺术表现力，凸显了戏剧性。开场时，雾霭迷蒙之中，一队人马迤逦前行，他们牵着骆驼，拉着儿女，背着行囊，举着柳枝，架着风车……从未知的远方来，向无穷的未来走，他们是曾经的历史，是人生的缩影。戏剧结尾时，人群再次前行，首尾呼应。舞台设计中，一座座琉璃屋顶移动、拼合成城市的模样，有效处理了此剧的多样时空。\n　　这部剧以40多位中青年演员为主要参演者，已经具有了良好开端，但是目前看来，还存在配合不够默契、细节刻画不够细腻、场面之间的链接不够严密的问题。此剧有扎实的艺术基础、较好的完成度，希望它能不断上演、持续打磨，展现持久的艺术魅力。\n　　（作者为中国艺术研究院话剧研究所所长）\n";

const tags = extract(text, 1);
console.log(tags[0].keyword);
