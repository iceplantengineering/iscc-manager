# ISCC+ Production Management System - Operation Flow and Input Timing / ISCC+生産管理システム - 運用フローと入力タイミング

## Overview / 概要
This document details the operational procedures and input timing for the ISCC+ certified production management system. It covers daily, weekly, monthly, and annual workflows.
ISCC+認証対応の持続可能な生産管理システムの日常運用における具体的なフローと各情報の入力タイミングを詳細に記述します。

---

## 1. Daily Operation Flow / 日次運用フロー

### 1.1 Morning Startup (8:00-8:30) / 朝のスタートアップ (8:00-8:30)

#### System Startup Confirmation / システム起動時確認
**Confirmation Items / 確認項目:**
- System normal startup / システムの正常起動
- Network connection status / ネットワーク接続状態
- Backup completion confirmation / バックアップ完了確認
- Alert notification confirmation / アラート通知の確認

**Responsible / 担当者:** IT System Administrator / ITシステム管理者
**Input Operations / 入力操作:** Status check, system restart if needed / 状況確認、必要に応じてシステム再起動

#### Daily Production Plan Confirmation / 当日の生産計画確認
**Input Information / 入力情報:**
- Daily production schedule / 当日の生産スケジュール
- Line assignments / 各ラインの割り当て
- Required material inventory check / 必要材料の在庫確認
- Personnel arrangement confirmation / 人員配置の確認

**Responsible / 担当者:** Production Management Staff / 生産管理担当者
**Input Screen / 入力画面:** `/production-plan`
**Input Frequency / 入力頻度:** Daily / 毎日

### 1.2 Material Receiving & Warehousing (As needed) / 材料受入・入庫 (随時)

#### Delivery Receiving Process / 納品受付プロセス
**Input Information / 入力情報:**
- Order number matching / 発注番号と照合
- Delivery slip information (quantity, lot number) / 納品書情報（数量、ロット番号）
- Receiving inspection results (appearance, quantity check) / 受入検査結果（外観、数量確認）
- ISCC+ certificate verification (certified materials only) / ISCC+証明書の確認（認証材料のみ）

**Input Screen / 入力画面:** `/order-stock` → 「Receiving Processing / 受入処理」
**Input Items / 入力項目:**
```
[Receiving Information / 入庫情報]
- Receiving Date/Time / 入庫日時: Auto-recorded / 自動記録
- Order Number / 発注番号: Select or manual input / 選択または手動入力
- Supplier / サプライヤー: Auto-display / 自動表示
- Material / 材料: Auto-display / 自動表示
- Delivery Quantity / 納品数量: Actual quantity / 実際の数量
- Lot Number / ロット番号: Material lot information / 材料ロット情報
- Inspection Results / 検査結果: Pass/Fail / 合格/不合格
- Inspector / 検査員: Responsible person name / 担当者名
- Storage Location / 保管場所: Warehouse location code / 倉庫場所コード
```

**Responsible / 担当者:** Warehouse Staff, Material Purchasing / 倉庫担当者、資材購買担当者
**Input Frequency / 入力頻度:** Each delivery / 納品発生時

### 1.3 Production Performance Input (End of each shift) / 生産実績入力 (各シフト終了時)

#### Production Start / 生産開始時
**Input Information / 入力情報:**
- Batch number generation / バッチ番号の生成
- Material withdrawal / 使用材料の払い出し
- Equipment parameter settings / 設備パラメータ設定
- Worker confirmation / 作業者の確認

**Input Screen / 入力画面:** `/production-plan` → 「Batch Management / バッチ管理」
**Input Frequency / 入力頻度:** Each batch start / 各バッチ開始時

#### Production Monitoring / 生産中モニタリング
**Input Information / 入力情報:**
- Production progress (hourly) / 生産進捗状況（1時間ごと）
- Equipment operation status / 設備稼働状況
- Quality intermediate inspection results / 品質中間検査結果
- Abnormal occurrence records / 異常発生時の記録

**Input Screen / 入力画面:** Each line monitoring screen / 各ラインモニタリング画面
**Input Frequency / 入力頻度:** Hourly, when abnormalities occur / 1時間ごと、異常発生時

#### Production End / 生産終了時
**Input Information / 入力情報:**
```
[Production Performance / 生産実績]
- Batch Number / バッチ番号: Auto-generated / 自動生成
- Production Quantity / 生産数量: Actual completed quantity / 実際の完成数量
- Defective Quantity / 不良品数量: Defective quantity and causes / 不良品の数量と原因
- Material Usage / 材料使用量: Actual usage of each material / 各材料の実際使用量
- Operating Hours / 稼働時間: Actual equipment operating time / 設備の実稼働時間
- Downtime / 停止時間: Downtime and reasons / 休止時間と理由
- Production Efficiency / 生産効率: Plan vs. actual / 計画対比
- Quality Inspection Results / 品質検査結果: Final inspection data / 最終検査データ
- Workers / 作業者: Responsible workers / 担当作業者
```

**Responsible / 担当者:** Site Supervisor, Quality Control / 現場監督者、品質管理担当者
**Input Screen / 入力画面:** `/production-plan` → 「Performance Input / 実績入力」
**Input Frequency / 入力頻度:** End of each shift, batch completion / 各シフト終了時、バッチ完了時

---

## 2. Weekly Operation Flow / 週次運用フロー

### 2.1 Weekly Production Planning (Friday) / 週次生産計画 (金曜日)

#### Next Week Production Planning / 来週の生産計画作成
**Input Information / 入力情報:**
```
[Weekly Production Plan / 週次生産計画]
- Planning Period / 計画期間: Target week (Monday-Friday) / 対象週（月曜日-金曜日）
- Product Production Quantity / 製品別生産数量: Production targets for each product / 各製品の生産目標
- Line Assignment / ラーン別割り当て: Plan for each production line / 各生産ラインの計画
- Required Material Quantity / 必要材料量: Material requirements calculation / 材料所要量計算
- Personnel Planning / 人員計画: Required workers and deployment / 必要作業者数と配置
- Equipment Maintenance / 設備メンテナンス: Maintenance plan adjustment / メンテナンス計画の調整
- Outsourcing Plan / 外注計画: External partner coordination / 外部協力会社との調整
```

**Responsible / 担当者:** Production Planning Staff, Manufacturing Director / 生産計画担当者、製造部長
**Input Screen / 入力画面:** `/production-plan` → 「Weekly Plan / 週次計画」
**Input Frequency / 入力頻度:** Every Friday / 毎週金曜日

### 2.2 Inventory Confirmation (Every Monday) / 在庫確認 (毎週月曜日)

#### Weekly Inventory Count / 週次在庫棚卸
**Input Information / 入力情報:**
```
[Inventory Confirmation / 在庫確認]
- Current Quantity / 現在庫数量: Actual inventory quantity / 実際の在庫数量
- Theoretical Inventory / 理論在庫: System inventory quantity / システム上の在庫数量
- Variance Analysis / 差異分析: Inventory differences and causes / 棚卸差異と原因
- Rotation / ローテーション: FIFO management confirmation / 先入先出管理確認
- Quality Status / 品質状態: Quality changes during storage / 保管中の品質変化
```

**Responsible / 担当者:** Warehouse Staff, Inventory Management / 倉庫担当者、在庫管理担当者
**Input Screen / 入力画面:** `/order-stock` → 「Inventory Management / 在庫管理」
**Input Frequency / 入力頻度:** Every Monday / 毎週月曜日

### 2.3 Supplier Evaluation (Every Friday) / サプライヤー評価 (毎週金曜日)

#### Weekly Supplier Performance / 週次サプライヤーパフォーマンス
**Input Information / 入力情報:**
```
[Supplier Evaluation / サプライヤー評価]
- Delivery Compliance Rate / 納期遵守率: Delay rate calculation / 遅延率の計算
- Quality Evaluation / 品質評価: Receiving inspection pass rate / 受入検査合格率
- Cost Performance / コストパフォーマンス: Price competitiveness / 価格競争力
- Communication / コミュニケーション: Problem response speed / 問題応答の迅速性
- Corrective Actions / 是正措置: Previous week issue response / 前週問題への対応状況
```

**Responsible / 担当者:** Purchasing Staff, Quality Control / 購買担当者、品質管理担当者
**Input Screen / 入力画面:** `/supplier-portal` → 「Supplier Evaluation / サプライヤー評価」
**Input Frequency / 入力頻度:** Every Friday / 毎週金曜日

---

## 3. Monthly Operation Flow / 月次運用フロー

### 3.1 Monthly Production Report (1st-5th of month) / 月次生産報告 (毎月1-5日)

#### Production Performance Aggregation / 生産実績集計
**Input Information / 入力情報:**
```
[Monthly Production Report / 月次生産報告]
- Production Volume / 生産数量: Monthly production results / 月間生産実績
- Production Efficiency / 生産効率: Each line's operation rate / 各ラインの稼働率
- Quality Metrics / 品質指標: Defect rate, return rate / 不良率、返品率
- Cost Performance / コスト実績: Unit cost, production cost / 原単位、生産コスト
- Equipment Operation / 設備稼働: Equipment utilization, downtime / 設備利用率、停止時間
- Labor Productivity / 労務生産性: Production per worker / 作業者あたり生産量
```

**Responsible / 担当者:** Production Management Director, Accounting / 生産管理部長、経理担当者
**Input Screen / 入力画面:** `/analytics` → 「Monthly Report / 月次レポート」
**Input Frequency / 入力頻度:** 1st-5th of each month / 毎月1-5日

### 3.2 ISCC+ Mass Balance Calculation (Around 10th of month) / ISCC+マスバランス計算 (毎月10日前後)

#### Monthly Mass Balance Report / 月次マスバランスレポート
**Input Information / 入力情報:**
```
[Mass Balance Data / マスバランスデータ]
- Bio-based Input Quantity / 生物由来原料投入量: Certified material input quantity / 認証材料の投入量
- Certified Product Output / 認証製品産出量: Certified product production quantity / 認証製品の生産量
- System Loss / 系内損失量: Loss during production process / 生産過程での損失
- Conversion Rate / 転換率: Bio-based carbon conversion efficiency / 生物由来炭素の転換効率
- Inventory Changes / 在庫変動: Month start/end inventory changes / 月初・月末の在庫変化
- Verification Method / 検証方法: Calculation basis and verification method / 計算根拠と検証方法
```

**Responsible / 担当者:** Compliance Staff, Production Engineers / コンプライアンス担当者、生産技術者
**Input Screen / 入力画面:** `/certification` → 「Mass Balance / マスバランス」
**Input Frequency / 入力頻度:** Around 10th of each month / 毎月10日前後

### 3.3 Carbon Footprint Calculation (Around 15th of month) / 炭素フットプリント計算 (毎月15日前後)

#### Monthly CO2 Emissions Calculation / 月次CO2排出量計算
**Input Information / 入力情報:**
```
[Carbon Footprint / 炭素フットプリント]
- Scope1 Emissions: Direct emissions (fuel combustion, etc.) / 直接排出（燃料燃焼など）
- Scope2 Emissions: Indirect emissions from electricity, heat & steam use / 電気、熱・蒸気の使用による間接排出
- Scope3 Emissions: Supply chain emissions (transport, waste, etc.) / サプライチェーンの排出量（輸送、廃棄物など）
- Emission Unit / 排出原単位: Emissions per unit / 単位あたりの排出量
- Reduction Performance / 削減実績: Reduction vs. previous year/month / 前年比、前月比の削減率
```

**Responsible / 担当者:** Environmental Staff, Energy Management / 環境担当者、エネルギー管理担当者
**Input Screen / 入力画面:** `/carbon` → 「Emissions Calculation / 排出量計算」
**Input Frequency / 入力頻度:** Around 15th of each month / 毎月15日前後

### 3.4 Quality Management Monthly Report (Around 20th of month) / 品質管理月次報告 (毎月20日前後)

#### Quality Management Comprehensive Report / 品質管理総合報告
**Input Information / 入力情報:**
```
[Quality Monthly Report / 品質月報]
- Inspection Count / 検査件数: Total conducted inspections / 実施した検査の総数
- Defect Count / 不良件数: Occurred defect count / 発生した不良の数
- Defect Rate / 不良率: Quality defect occurrence rate / 品質不良の発生率
- Major Defect Items / 主要不良項目: Defect analysis by category / 不良の内容別分析
- Corrective Actions / 是正措置: Implemented corrective actions and effectiveness / 実施した是正措置と効果
- Customer Complaints / 顧客クレーム: Occurred complaint information / 発生したクレーム情報
```

**Responsible / 担当者:** Quality Assurance Director, Quality Control / 品質保証部長、品質管理担当者
**Input Screen / 入力画面:** `/quality` → 「Monthly Quality Report / 月次品質報告」
**Input Frequency / 入力頻度:** Around 20th of each month / 毎月20日前後

---

## 4. Quarterly Operation Flow / 四半期運用フロー

### 4.1 Quarterly Business Planning (Month before each Q start) / 四半期事業計画 (各Q開始前月)

#### Quarterly Production Planning / 四半期生産計画作成
**Input Information / 入力情報:**
```
[Quarterly Plan / 四半期計画]
- Demand Forecast / 需要予測: Quarterly market demand forecast / 市場需要の四半期予測
- Production Targets / 生産目標: Quarterly production quantity targets / 四半期生産数量目標
- Investment Plan / 投資計画: Equipment investment, improvement investment plans / 設備投資、改善投資の計画
- Personnel Plan / 人員計画: Employment plan, education plan / 雇用計画、教育計画
- Raw Material Plan / 原材料計画: Procurement plan, inventory policy / 調達計画、在庫方針
```

**Responsible / 担当者:** Corporate Planning Director, Production Director / 経営企画部長、生産本部長
**Input Screen / 入力画面:** `/production-plan` → 「Quarterly Plan / 四半期計画」
**Input Frequency / 入力頻度:** Month before each quarter starts / 各四半期開始前月

### 4.2 Supplier Quarterly Evaluation (Within 1 week after each Q end) / サプライヤー四半期評価 (各Q終了後1週間以内)

#### Supplier Comprehensive Evaluation / サプライヤー総合評価
**Input Information / 入力情報:**
```
[Supplier Evaluation / サプライヤー評価]
- Quality Evaluation / 品質評価: Quality performance evaluation / 品質パフォーマンスの評価
- Delivery Evaluation / 納期評価: Delivery compliance evaluation / 納期遵守の評価
- Cost Evaluation / コスト評価: Price competitiveness evaluation / 価格競争力の評価
- Sustainability Evaluation / サステナビリティ評価: Environmental & social contribution evaluation / 環境・社会貢献の評価
- Overall Score / 総合評価点: Weighted comprehensive evaluation / 重み付け総合評価
- Improvement Requests / 改善要求: Next period improvement requirements / 次期の改善要求事項
```

**Responsible / 担当者:** Purchasing Director, Quality Assurance Director / 購買部長、品質保証部長
**Input Screen / 入力画面:** `/supplier-portal` → 「Quarterly Evaluation / 四半期評価」
**Input Frequency / 入力頻度:** Within 1 week after each quarter ends / 各四半期終了後1週間以内

---

## 5. Annual Operation Flow / 年次運用フロー

### 5.1 Annual Business Planning (April start) / 年度事業計画 (4月開始前)

#### Annual Production Planning / 年度生産計画作成
**Input Information / 入力情報:**
```
[Annual Plan / 年度計画]
- Annual Production Targets / 年度生産目標: Annual production quantity targets / 年間生産数量目標
- Equipment Investment Plan / 設備投資計画: Major equipment investment plans / 主要設備の投資計画
- Personnel Plan / 人員計画: Organization structure, personnel planning / 組織体制、人員計画
- Budget Plan / 予算計画: Budget allocation for each department / 各部門の予算配分
- Technology Development Plan / 技術開発計画: New products, new technology development plans / 新製品、新技術開発計画
```

**Responsible / 担当者:** Management Team, Department Directors / 経営層、各部門長
**Input Screen / 入力画面:** `/analytics` → 「Annual Plan / 年度計画」
**Input Frequency / 入力頻度:** Before fiscal year start (March) / 年度開始前（3月）

### 5.2 ISCC+ Certification Renewal Preparation (3 months before expiry) / ISCC+認証更新準備 (認証期限3ヶ月前)

#### Certification Renewal Preparation / 認証更新準備
**Input Information / 入力情報:**
```
[Certification Renewal Preparation / 認証更新準備]
- Certification Status Check / 認証状況確認: Current certification validity period / 現在の認証有効期限
- Document Preparation / 文書整備: Required document preparation status / 必要書類の準備状況
- Audit Response / 監査対応: Past audit finding responses / 過去の監査指摘事項対応
- Corrective Actions / 是正措置: New corrective action implementation / 新たな是正措置の実施
- Internal Audit / 内部監査: Internal audit implementation plan / 内部監査の実施計画
```

**Responsible / 担当者:** Compliance Staff, Quality Assurance Director / コンプライアンス担当者、品質保証部長
**Input Screen / 入力画面:** `/certification` → 「Certification Management / 認証管理」
**Input Frequency / 入力頻度:** Preparation starts 3 months before expiry / 認証期限3ヶ月前から準備開始

### 5.3 Annual Closing & Reporting (Year-end) / 年度決算・報告 (年度末)

#### Annual Financial Reporting / 年度財務報告
**Input Information / 入力情報:**
```
[Annual Closing / 年度決算]
- Production Results / 生産実績: Annual production volume, efficiency / 年間生産数量、効率
- Financial Results / 財務実績: Sales, costs, profits / 売上、原価、利益
- Equipment Status / 設備状況: Equipment investment, depreciation / 設備投資、減価償却
- Personnel Status / 人員状況: Employee count, labor productivity / 従業員数、労働生産性
- Environmental Results / 環境実績: Environmental impact, reduction achievements / 環境負荷、削減実績
```

**Responsible / 担当者:** Accounting Director, Corporate Planning / 経理部長、経営企画部長
**Input Screen / 入力画面:** `/cost-analysis` → 「Annual Closing / 年度決算」
**Input Frequency / 入力頻度:** Year-end / 年度末

---

## 6. Non-Routine Operation Flow / 非定常時運用フロー

### 6.1 Quality Issue Response / 品質問題発生時

#### Defect Product Response / 不良品発生対応
**Input Information / 入力情報:**
```
[Quality Issue Response / 品質問題対応]
- Occurrence Date/Time / 発生日時: Exact time of problem occurrence / 問題発生の正確な時間
- Occurrence Location / 発生場所: Process where problem occurred / 問題が発生した工程
- Defect Content / 不良内容: Specific defect phenomena / 具体的な不良現象
- Impact Scope / 影響範囲: Affected product quantities / 影響を受けた製品数量
- Cause Investigation / 原因調査: Cause analysis results / 原因分析結果
- Corrective Actions / 是正措置: Implemented response measures / 実施した対応策
- Preventive Actions / 予防措置: Recurrence prevention measures / 再発防止策
- Responsible Person / 担当者: Response responsible person / 対応担当者情報
```

**Responsible / 担当者:** Quality Assurance Director, Production Engineers / 品質保証部長、生産技術者
**Input Screen / 入力画面:** `/quality` → 「Issue Response / 問題対応」
**Input Frequency / 入力頻度:** When problems occur / 問題発生時

### 6.2 Equipment Failure / 設備故障時

#### Equipment Downtime Recording / 設備ダウンタイム記録
**Input Information / 入力情報:**
```
[Equipment Failure Response / 設備故障対応]
- Failure Date/Time / 故障発生日時: Exact failure time / 正確な故障時間
- Failed Equipment / 故障設備: Equipment identification information / 該当設備の識別情報
- Failure Content / 故障内容: Specific failure phenomena / 故障の具体的な現象
- Impact Level / 影響度: Production impact degree / 生産への影響程度
- Repair Time / 修理時間: Time taken for repair / 修理にかかった時間
- Repair Content / 修理内容: Implemented repair work / 実施した修理作業
- Recurrence Prevention / 再発防止: Preventive maintenance measures / 予防保全措置
```

**Responsible / 担当者:** Equipment Maintenance Staff, Production Line Managers / 設備保全担当者、生産ライン管理者
**Input Screen / 入力画面:** `/production-plan` → 「Equipment Management / 設備管理」
**Input Frequency / 入力頻度:** When equipment failures occur / 設備故障発生時

### 6.3 Emergency Ordering / 緊急発注時

#### Emergency Order Processing / 緊急発注処理
**Input Information / 入力情報:**
```
[Emergency Order / 緊急発注]
- Order Reason / 発注理由: Reason for urgency / 緊急性の理由
- Required Quantity / 必要数量: Required material quantity / 必要な材料数量
- Delivery Requirement / 納期要求: Required delivery date / 要求納期
- Approver / 承認者: Emergency order approver / 緊急発注の承認者
- Tracking Information / 追跡情報: Post-order tracking information / 発注後の追跡情報
```

**Responsible / 担当者:** Purchasing Staff, Material Planning / 購買担当者、資材計画担当者
**Input Screen / 入力画面:** `/order-stock` → 「Emergency Order / 緊急発注」
**Input Frequency / 入力頻度:** Emergency situations only / 緊急時のみ

---

## 7. Data Input Quality Management / データ入力の品質管理

### 7.1 Input Checklist / 入力チェックリスト
**Pre-Input Confirmations / 入力前の確認事項:**
- Are all required items completely entered? / 必須項目がすべて入力されているか
- Is numerical data valid? (range check) / 数値データの妥当性（範囲チェック）
- Is date data consistent? / 日付データの整合性
- Are there any contradictions with related data? / 関連データとの矛盾がないか

### 7.2 Data Verification Process / データ検証プロセス
**Automatic Verification / 自動検証:**
- System-based automatic validation / システムによる自動バリデーション
- Consistency checks based on business rules / 業務ルールに基づく整合性チェック
- Duplicate data elimination / 重複データの排除

**Manual Verification / 手動検証:**
- Supervisor confirmation and approval / 上長による確認・承認
- Regular data audits / 定期的なデータ監査
- Comparison with external data / 外部データとの照合

### 7.3 Error Handling / エラーハンドリング
**When Input Errors Occur / 入力エラー発生時:**
- Display error messages / エラーメッセージの表示
- Provide correction guidance / 修正ガイダンスの提供
- Record error logs / エラーログの記録
- Cause analysis and corrective actions / 原因分析と是正措置

---

## Conclusion / 結論

Following this operation flow ensures ISCC+ certification compliance and enables efficient production management. The systematic approach to data input and process management guarantees reliable information for decision-making and maintains the integrity of the certified sustainable material production system.
この運用フローに従ってシステムを運用することで、ISCC+認証要件を確実に満たし、効率的な生産管理を実現します。体系的なデータ入力とプロセス管理アプローチにより、意思決定のための信頼性の高い情報を保証し、認証された持続可能な材料生産システムの完全性を維持します。